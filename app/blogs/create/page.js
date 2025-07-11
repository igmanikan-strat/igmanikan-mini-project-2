import { createBlog } from '../../actions/blogActions';

export default function CreateBlog() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6f3ff] to-[#e9e4fa] px-4">
      <form
        action={createBlog}
        className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md space-y-6 font-poppins"
      >
        <h1 className="text-3xl font-bold text-[var(--brand-color)] text-center">
          Create New Blog
        </h1>

        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            name="title"
            placeholder="Title"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[var(--brand-color)]"
            required
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">Summary</label>
          <textarea
            name="summary"
            rows={3}
            placeholder="Short summary for the homepage"
            className="w-full px-4 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-[var(--brand-color)]"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Content</label>
          <textarea
            name="content"
            rows={8}
            placeholder="Content"
            className="w-full px-4 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-[var(--brand-color)]"
            required
          />
        </div>

        <button
          type="submit"
          className="relative inline-block min-w-[160px] px-6 py-3 rounded-full font-semibold text-[var(--brand-color)] border-2 border-[var(--brand-color)] overflow-hidden transition-transform duration-300 transform hover:scale-105 group"
        >
          <span className="absolute inset-0 bg-[var(--hover-color)] w-0 group-hover:w-full transition-all duration-700 ease-out z-0 left-0 top-0"></span>
          <span className="relative z-10 group-hover:text-black">Create Blog</span>
        </button>
      </form>
    </div>
  );
}
