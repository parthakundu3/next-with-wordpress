"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const demoImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
];

export default function PostsGrid({
  posts,
  totalPages,
  currentPage,
}: {
  posts: any[];
  totalPages: number;
  currentPage: number;
}) {
  return (
    <div className="container mx-auto my-12 px-4">
      {/* Page Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text 
                   bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-center mb-12"
      >
        ✨ Explore Our Latest Posts ✨
      </motion.h1>

      {/* Grid of Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {posts.map((post, index) => {
          const postDate = new Date(post.date); // WP REST API gives ISO 8601
          const formattedDate = postDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          const formattedTime = postDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all"
            >
              <Link href={`/posts/${post.slug}`}>
                <div className="relative w-full h-52">
                  <Image
                    src={
                      post.featured_image_url ||
                      demoImages[index % demoImages.length]
                    }
                    alt={post.title.rendered}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5 space-y-3">
                  <h2
                    className="text-lg md:text-xl font-bold text-gray-800 line-clamp-2
                               hover:text-purple-600 transition-colors duration-300"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <p
                    className="text-gray-600 text-sm line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />

                  {/* Footer with author, date & time */}
                  <div className="pt-3 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
                    <span>
                      📅 {formattedDate} • ⏰ {formattedTime}
                    </span>
                    <span className="italic">
                      ✍️ {post._embedded?.author?.[0]?.name || "Admin"}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <PaginationLinks currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}

function PaginationLinks({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pagesArray = Array(totalPages)
    .fill(null)
    .map((_, page) => page + 1);

  return (
    <div className="flex space-x-3">
      {pagesArray.map((page) => {
        const isSelected = page === currentPage;
        return (
          <Link
            key={page}
            href={`/?page=${page}`}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              isSelected
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700"
            }`}
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
}
