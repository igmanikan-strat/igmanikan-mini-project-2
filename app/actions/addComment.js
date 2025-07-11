'use server';

import { db } from '../../db/index';
import { comments } from '../../src/schema';
import { revalidatePath } from 'next/cache';

export async function addComment(formData) {
  const blogId = parseInt(formData.get('blogId'));
  const name = formData.get('name');
  const message = formData.get('message');

  if (!name || !message || isNaN(blogId)) {
    return { error: 'All fields are required.' };
  }

  await db.insert(comments).values({ blogId, name, message });

  // Refresh the page
  revalidatePath(`/blogs/${formData.get('slug')}`);
}
