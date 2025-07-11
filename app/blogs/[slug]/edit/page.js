// app/blogs/[slug]/edit/page.js
import { db } from '../../../../db';
import { blogs } from '../../../../src/schema';
import { eq } from 'drizzle-orm';
import { updateBlog } from '../../../actions/blogActions';

export default async function EditBlog({ params }) {
  const result = await db.select().from(blogs).where(eq(blogs.slug, params.slug));
  const blog = result[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f3ff] to-[#e9e4fa] px-6 py-10 text-[var(--text-dark)] font-poppins">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-[var(--brand-color)] text-center">Edit Blog</h1>

        <form action={updateBlog} className="space-y-6">
          <input type="hidden" name="id" value={blog.id} />

          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              name="title"
              defaultValue={blog.title}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Content</label>
            <textarea
              name="content"
              defaultValue={blog.content}
              rows={8}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="relative inline-block min-w-[160px] text-center px-6 py-3 rounded-full font-semibold text-[var(--brand-color)] border-2 border-[var(--brand-color)] overflow-hidden transition-transform duration-300 transform hover:scale-105"
          >
            <span className="absolute inset-0 bg-[var(--hover-color)] w-0 group-hover:w-full transition-all duration-700 ease-out z-0 left-0 top-0"></span>
            <span className="relative z-10 text-[var(--brand-color)] group-hover:text-black">
              Save Changes
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
