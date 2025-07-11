'use server';

import { db } from "../../db/index.js";
import { blogs } from "../../src/schema.js";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteBlog(formData) {
  const id = parseInt(formData.get("id"));

  await db.delete(blogs).where(eq(blogs.id, id));
  revalidatePath("/blogs");
}


