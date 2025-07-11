'use server';
import { db } from "../../db/index.js";
import { blogs } from "../../src/schema.js";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { comments } from '../../src/schema.js';

// simple slugify function
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove invalid chars
    .replace(/\s+/g, "-")         // replace spaces with -
    .replace(/-+/g, "-");         // remove multiple -
}

export async function createBlog(formData) {
  const title = formData.get("title");
  const content = formData.get("content");
  const summary = formData.get("summary");

  if (!title || !content || !summary) return;

  const slug = slugify(title);

  await db.insert(blogs).values({ title, slug, summary, content });

  redirect(`/blogs/${slug}`);
}

export async function updateBlog(formData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title");
  const content = formData.get("content");
  if (!id || !title || !content) return;

  await db.update(blogs).set({ title, content }).where(eq(blogs.id, id));
  revalidatePath("/blogs");
}


export async function updateComment(formData) {
  const id = Number(formData.get("id"));
  const name = formData.get("name");
  const message = formData.get("message");
  const slug = formData.get("slug");

  if (!id || !name || !message) return;

  await db
    .update(comments)
    .set({ name, message })
    .where(eq(comments.id, id));

  revalidatePath(`/blogs/${slug}`);
}

export async function deleteComment(formData) {
  const id = Number(formData.get('id'));
  // const blogId = Number(formData.get('blogId'));
  await db.delete(comments).where(eq(comments.id, id));
  revalidatePath(`/blogs/${formData.get('slug')}`);
}