import { db } from "../db/index.js";
import { blogs } from "../src/schema.js";

await db.insert(blogs).values([
  {
    slug: "first-post",
    title: "My First Blog Post",
    content: "This is the content of my first blog.",
  },
  {
    slug: "nextjs-tips",
    title: "Next.js Tips & Tricks",
    content: "Some helpful tips for working with Next.js...",
  },
  {
    slug: "drizzle-vs-prisma",
    title: "Drizzle vs Prisma",
    content: "A comparison of two popular ORMs in 2025...",
  },
]);
console.log("✅ Seeded blog data!");
