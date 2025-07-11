'use client';
import { useState } from 'react';
import { updateComment, deleteComment } from '../actions/blogActions';

export default function CommentItem({ comment, slug }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(comment.name);
  const [message, setMessage] = useState(comment.message);

  return (
    <li className="p-4 bg-gray-100 rounded-xl space-y-2">
      {isEditing ? (
        <form action={updateComment} className="space-y-2">
          <input type="hidden" name="id" value={comment.id} />
          <input type="hidden" name="slug" value={slug} />
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-1 border rounded"
            required
          />
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            className="w-full px-3 py-1 border rounded"
            required
          />
          <div className="flex gap-4">
            <button type="submit" className="text-blue-600 text-sm hover:underline">Save</button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-gray-500 text-sm hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="font-semibold text-[var(--brand-color)]">{comment.name}</p>
          <p className="text-gray-700">{comment.message}</p>
          <div className="flex gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 text-sm hover:underline"
            >
              Edit
            </button>
            <form action={deleteComment}>
              <input type="hidden" name="id" value={comment.id} />
              <input type="hidden" name="slug" value={slug} />
              <button type="submit" className="text-red-600 text-sm hover:underline">
                Delete
              </button>
            </form>
          </div>
        </>
      )}
    </li>
  );
}
