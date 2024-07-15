import { useAuthContext } from "@/hooks/useAuthContext";
import { usePostContext } from "@/hooks/usePostContext";
import Link from "next/link";

interface PostButtonsProps {
  postId: number;
  hideViewMore?: boolean;
  onRemove?: (removedPostId: number) => void
}

const PostButtons = ({ postId, hideViewMore = false, onRemove}: PostButtonsProps) => {
  const { removePost } = usePostContext();
  const { isLogged } = useAuthContext();

  const handleRemoveButtonClick = () => {
    removePost(postId)
    if (onRemove) onRemove(postId)
  }

  return (
    <div className="post-buttons-container flex flex-row">
      {!hideViewMore && <Link href={`posts/${postId}`}>View details</Link>}
      {isLogged && (
        <>
          <button onClick={handleRemoveButtonClick}>Remove post</button>
          <Link href={`posts/${postId}?edit=true`}>Edit post</Link>
        </>
      )}
    </div>
  );
};

export default PostButtons;
