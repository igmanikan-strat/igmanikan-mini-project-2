import { db } from "../../../db/index.js";
import { blogs, comments } from "../../../src/schema.js";
import { eq } from "drizzle-orm";
import { addComment } from "../../../app/actions/addComment";
import { deleteBlog } from "../../../app/actions/deleteBlog";
import { notFound } from "next/navigation";
import { Link } from 'next/link';
import { updateComment, deleteComment } from "../../../app/actions/blogActions";
import CommentItem from '../../components/CommentItem'; // adjust path if needed
import CommentFormWrapper from './CommentFormWrapper';
import ReactMarkdown from 'react-markdown';

export default async function BlogDetail({ params }) {
  const result = await db.select().from(blogs).where(eq(blogs.slug, params.slug));
  
  const post = result[0];
  if (!post) return notFound();

  const allComments = await db
    .select()
    .from(comments)
    .where(eq(comments.blogId, post.id))
    .orderBy(comments.createdAt);
    
  const markdownWithoutMainTitle = post.content.replace(/^# .*\n/, '');
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f3ff] to-[#e9e4fa] px-6 py-10 text-[var(--text-dark)] font-poppins">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-md space-y-10">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-[var(--brand-color)]">{post.title}</h1>
          <div className="prose prose-lg max-w-none text-gray-800">


            <ReactMarkdown
              components={{
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl font-semibold mt-6 mb-2 text-[var(--brand-color)]" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-xl font-medium mt-4 mb-2 text-gray-700" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-base leading-relaxed text-gray-800 mb-4" {...props} />
                ),
              }}
            >
              {markdownWithoutMainTitle}
            </ReactMarkdown>
          </div>
        </div>


        {/* Delete and Edit Blog Controls */}
        <div className="flex justify-between items-center mb-6">
          {/* <h1 className="text-4xl font-bold text-[var(--brand-color)]">{post.title}</h1> */}

          <div className="flex items-center gap-4">
            <a
              href={`/blogs/${post.slug}/edit`}
              className="group relative inline-block px-4 py-2 rounded-full font-semibold text-[var(--brand-color)] border-2 border-[var(--brand-color)] overflow-hidden transition-transform duration-300 transform hover:scale-105"
            >
              <span className="absolute inset-0 bg-[#999999] w-0 group-hover:w-full transition-all duration-700 ease-out z-0 left-0 top-0 rounded-full"></span>

              <span className="relative z-10 text-[var(--brand-color)] group-hover:text-black">Edit Blog</span>
            </a>

            <form action={deleteBlog}>
              <input type="hidden" name="id" value={post.id} />
              <button
                type="submit"
                className="group relative inline-block px-4 py-2 rounded-full font-semibold text-red-600 border-2 border-red-600 overflow-hidden transition-transform duration-300 transform hover:scale-105"
              >
                <span className="absolute inset-0 bg-red-200 w-0 group-hover:w-full transition-all duration-700 ease-out z-0 left-0 top-0 rounded-full"></span>
                <span className="relative z-10 group-hover:text-black">Delete Blog</span>
              </button>
            </form>
          </div>
        </div>


        
        {/* Comments Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-[var(--brand-color)]">Comments</h2>
          <ul className="space-y-4">
            {allComments.map((comment) => (
  <li key={comment.id} className="p-4 bg-gray-100 rounded-xl space-y-2">
    <p className="font-semibold text-[var(--brand-color)]">{comment.name}</p>
    <p className="text-gray-700">{comment.message}</p>

    {/* Edit toggle using a form instead */}
      <details>
        <summary className="text-blue-600 cursor-pointer hover:underline text-sm">Edit</summary>
        <form action={updateComment} className="mt-2 space-y-2">
          <input type="hidden" name="id" value={comment.id} />
          <input type="hidden" name="slug" value={params.slug} />
          <div>
            <label className="block text-sm font-semibold">Name</label>
            <input
              name="name"
              defaultValue={comment.name}
              required
              className="w-full px-3 py-1 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Message</label>
            <textarea
              name="message"
              defaultValue={comment.message}
              rows={3}
              required
              className="w-full px-3 py-1 border rounded"
            />
          </div>
          <button
            type="submit"
            className="text-black bg-[var(--brand-color)] px-3 py-1 rounded hover:bg-[var(--hover-color)]"
          >
            Save
          </button>
        </form>
      </details>

      {/* 🗑️ Delete Button */}
      <form action={deleteComment} className="mt-2">
        <input type="hidden" name="id" value={comment.id} />
        <input type="hidden" name="slug" value={params.slug} />
        <button
          type="submit"
          className="text-red-600 text-sm hover:underline"
        >
          Delete
        </button>
      </form>

  </li>
))}

          </ul>
        </div>

        

        {/* Comment Form */}
        <CommentFormWrapper blogId={post.id} slug={params.slug} />
      </div>
    </div>
  );
}
