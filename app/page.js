import { db } from '../db/index';
import { blogs } from '../src/schema';
import Link from 'next/link';

export default async function HomePage() {
  const allBlogs = await db.select().from(blogs);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f6f3ff] to-[#e9e4fa] px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-[var(--brand-color)]">All Blogs</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create and explore blogs made by you and other people.
          </p>
          <Link
  href="/blogs/create"
  className="group relative inline-block px-6 py-3 rounded-full font-semibold text-[#6E1BF5] border-2 border-[#6E1BF5] overflow-hidden transition-transform duration-300 hover:scale-105"
>
  <span className="absolute inset-0 bg-[#be29ec] w-0 group-hover:w-full transition-all duration-700 ease-out z-0 left-0 top-0"></span>
  <span className="relative z-10 text-[#6E1BF5] group-hover:text-black">+ New Blog</span>
</Link>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {allBlogs.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all hover:scale-[1.02] text-left"
            >
              <h2 className="text-xl font-bold mb-2 text-[var(--brand-color)]">{post.title}</h2>
              <p className="text-gray-700 line-clamp-4">
                {post.summary}
              </p>
            </Link>
          ))}
        </div>


      </div>
    </main>
  );
}
