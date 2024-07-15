"use client";
import { usePostContext } from "@/hooks/usePostContext";
import { Post } from "@/shared/models/base-models";
import { Nullable } from "@/shared/models/base-types";
import { isNull } from "@/shared/utilities/type-guards";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PostButtons from "../post-buttons/post-buttons";

interface PostDetailsProps {
  postId: number;
  isEditing?: boolean;
}

const PostDetails = ({ postId, isEditing = false }: PostDetailsProps) => {
  const { isLoading, selectPost, selectedPost, editPost } = usePostContext();
  const router = useRouter();
  const [modifiedTitle, setModifiedTitle] = useState<Nullable<string>>(null);
  const [modifiedBody, setModifiedBody] = useState<Nullable<string>>(null);
  const [hasErrors, setHasErrors] = useState<boolean>(false);

  const handleSaveChanges = () => {
    if (!modifiedTitle && !modifiedBody) {
      return setHasErrors(true);
    }
    const payload: Partial<Post> = {};

    if (modifiedTitle) payload.title = modifiedTitle;
    if (modifiedBody) payload.body = modifiedBody;

    try {
      editPost(postId, payload);
      router.push(`/posts/${postId}`);
    } catch {}
  };

  useEffect(() => {
    return () => {
      selectPost(null);
    };
  }, []);

  useEffect(() => {
    setModifiedTitle(selectedPost?.title ?? null);
    setModifiedBody(selectedPost?.body ?? null);
  }, [selectedPost]);

  useEffect(() => {
    if (!isLoading) selectPost(postId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, isLoading]);

  if (isLoading || isNull(selectedPost)) {
    return <>Could not load post with id: {postId}</>;
  }

  return (
    <div className="center-block padding-y flex flex-col gap-y">
      {isEditing ? (
        <span className="form-field">
          <label>Title</label>
          <input
            type="text"
            value={modifiedTitle ?? ""}
            onInput={(e) => setModifiedTitle(e.currentTarget.value ?? null)}
          />
        </span>
      ) : (
        <h2>{selectedPost.title}</h2>
      )}

      {isEditing ? (
        <>
          <label>Content</label>
          <textarea
            value={modifiedBody ?? ""}
            onInput={(e) => setModifiedBody(e.currentTarget.value ?? null)}
          />
        </>
      ) : (
        <p>{selectedPost.body}</p>
      )}

      {hasErrors && <h4>You can not save the form with the provided data</h4>}

      {isEditing && <button onClick={handleSaveChanges}>Save changes</button>}

      {!isEditing && <PostButtons postId={postId} hideViewMore onRemove={() => router.push('/posts')}/>}
    </div>
  );
};

export default PostDetails;
