import Link from "next/link";
import { db } from "../../db/index.js";
import { blogs } from "../../src/schema.js";
//import dynamic from 'next/dynamic';

export default async function BlogList() {
  const allBlogs = await db.select().from(blogs);

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allBlogs.map((post) => (
          <Link
            key={post.id}
            href={`/blogs/${post.slug}`}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.summary}</p>

          </Link>
        ))}
      </div>
    </div>
  );
}
