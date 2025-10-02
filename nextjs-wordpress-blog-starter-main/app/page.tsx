// app/page.tsx
import { use } from "react";
import wpService from "@/lib/wordpress/wp-service";
import PostsGrid from "@/components/PostsGrid"; // client component

export default function Home({ searchParams }: { searchParams: { page?: string } }) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { posts, totalPages } = use(wpService.getPosts({ page }));
  return (
    <PostsGrid posts={posts} totalPages={totalPages} currentPage={page} />
  );
}
