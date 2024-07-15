import { Post } from "@/shared/models/base-models";
import UserIcon from "@/styles/icons/user-icon";
import PostButtons from "../post-buttons/post-buttons";
import Link from "next/link";
import { capitalizeSentence } from "@/shared/utilities/utils";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="post-card">
      <div className="flex-row post-card-header">
        <h3 className="truncate-2 ">
          <Link href={`posts/${post.id}`}>{post.title}</Link>
        </h3>
        <span className="flex-row gap-x align-card-header">
          <UserIcon />
          <p>{post.userId?.toString()} </p>
        </span>
      </div>
      <div className="card-body">
        <p>{capitalizeSentence(post.body)}</p>
      </div>
      <PostButtons postId={post.id} />
    </div>
  );
};

export default PostCard;
