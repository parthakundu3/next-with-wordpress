import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import wpService from "@/lib/wordpress/wp-service";

interface PostPageParams {
  params: {
    slug: string;
    _embed:boolean
  };
}

function PostPage({ params }: PostPageParams) {
  const { posts } = use(
    wpService.getPosts({
      slug: [params.slug],
      _embed: true,
    })
  );

  const post = posts ? posts[0] : null;

  if (!post) {
    notFound();
  }

  const postDate = new Date(post.date);
  const formattedDate = postDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = postDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const author = post._embedded?.author?.[0] as any;
  const featuredImage =
     (post._embedded?.["wp:featuredmedia"]?.[0] as any)?.source_url  ||
    "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=1600&q=80";

  return (
    <article className="my-10 container mx-auto px-4 lg:px-16">
      {/* Featured Image Banner */}
      <div className="relative w-full h-72 md:h-[28rem] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={featuredImage}
          alt={post.title.rendered}
          fill
          className="object-cover brightness-90 hover:brightness-100 transition-all duration-300"
        />
      </div>

      {/* Post Header */}
      <div className="mt-8 space-y-4 text-center">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text 
          bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {/* Meta Info */}
        <div className="flex items-center justify-center space-x-4 text-gray-600 text-sm">
          {author?.avatar_urls?.["48"] && (
            <Image
              src={author?.avatar_urls["48"]}
              alt={author?.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <span>✍️ {author?.name || "Admin"}</span>
          <span>📅 {formattedDate}</span>
          <span>⏰ {formattedTime}</span>
        </div>
      </div>

      {/* Post Excerpt */}
      {post.excerpt?.raw && (
        <p className="mt-6 text-lg italic text-gray-700 text-center max-w-2xl mx-auto">
          {post.excerpt.raw}
        </p>
      )}

      {/* Post Content */}
      <div
        className="prose prose-lg max-w-4xl mx-auto mt-10 prose-headings:text-gray-800 
                   prose-p:text-gray-700 prose-a:text-purple-600 prose-a:no-underline 
                   hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      {/* Comments Section */}
      <section className="mt-16 max-w-3xl mx-auto bg-gray-50 rounded-2xl shadow-md p-6 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          💬 Comments
        </h3>

        {/* Placeholder for comments */}
        <p className="text-gray-600 text-sm mb-6">
          Comments integration with WordPress API coming soon...
        </p>

        {/* Simple Comment Form */}
        <form className="space-y-4">
          <textarea
            placeholder="Share your thoughts..."
            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-xl shadow hover:opacity-90 transition"
          >
            Post Comment
          </button>
        </form>
      </section>
    </article>
  );
}

export default PostPage;

export async function generateStaticParams() {
  const { posts } = await wpService.getPosts({
    per_page: 100,
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
