'use client';

import { useState, useEffect } from 'react';
import { addComment } from "../../app/actions/addComment"; // Adjust path as needed

export default function CommentForm({ blogId, slug }) {
  const [anonymous, setAnonymous] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (anonymous) {
      const adjectives = ['Hidden', 'Quiet', 'Anonymous', 'Shy', 'Secret', 'Masked'];
      const animals = ['Owl', 'Cat', 'Fox', 'Tiger', 'Hawk', 'Wolf'];
      const randomName =
        adjectives[Math.floor(Math.random() * adjectives.length)] +
        ' ' +
        animals[Math.floor(Math.random() * animals.length)];
      setName(randomName);
    } else {
      setName('');
    }
  }, [anonymous]);

  return (
    <form
      action={addComment}
      className="space-y-4 bg-gradient-to-br from-[#f6f3ff] to-[#e9e4fa] p-6 rounded-xl shadow"
    >
      <input type="hidden" name="blogId" value={blogId} />
      <input type="hidden" name="slug" value={slug} />

      <div>
        <label className="block font-semibold mb-1">Your Name</label>
        <input
          type="text"
          name="name"
          id="nameInput"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          readOnly={anonymous} // ✅ not disabled so it's still submitted
          placeholder="Your name"
          className="w-full px-4 py-2 border rounded"
        />
        <div className="mt-1 flex items-center gap-2">
          <input
            type="checkbox"
            id="anonymousCheckbox"
            className="accent-[var(--brand-color)]"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
          />
          <label htmlFor="anonymousCheckbox" className="text-sm">
            Remain Anonymous
          </label>
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-1">Message</label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="group relative inline-block min-w-[160px] text-center px-6 py-3 rounded-full font-semibold text-[#6E1BF5] border-2 border-[#6E1BF5] overflow-hidden transition-transform duration-300 transform hover:scale-105"
      >
        <span className="absolute inset-0 bg-[#69F0EF] w-0 group-hover:w-full transition-all duration-700 ease-out z-0 left-0 top-0"></span>
        <span className="relative z-10 text-[#6E1BF5] group-hover:text-black">
          Submit
        </span>
      </button>
    </form>
  );
}
