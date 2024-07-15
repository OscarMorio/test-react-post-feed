"use client";
import PostCard from "./post-card";
import { usePostContext } from "@/hooks/usePostContext";

const PostFeed = () => {
  const { posts } = usePostContext();

  return (
    <>
      <h4>Total posts: {posts.length}</h4>
      <div className="post-grid">
        {posts.length > 0 &&
          posts.map((post) => {
            return (
              <div key={post.id} className="grid-element">
                <PostCard post={post} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PostFeed;
