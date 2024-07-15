import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useMemo,
} from "react";
import { Post } from "../models/base-models";
import { useApiData } from "@/hooks/useApiData";
import { GenericPostCrudOperation, Nullable } from "../models/base-types";
import { isNull } from "../utilities/type-guards";

export interface PostContextProps {
  posts: Post[];
  selectedPost: Nullable<Post>;
  getById: (id: number) => Nullable<Post>;
  isLoading: boolean;
  selectPost: GenericPostCrudOperation;
  removePost: GenericPostCrudOperation;
  editPost: GenericPostCrudOperation<Post, number>;
}

export const PostContext = createContext<PostContextProps | null>(null);

export const PostContextProvider = ({
  children,
}: PropsWithChildren): ReactNode => {
  const {
    posts,
    removePost,
    isLoading,
    selectedPost,
    setSelectedPost,
    setPosts,
  } = useApiData();

  const getById = (id: number) => {
    return posts.find((post) => post.id === id) ?? null;
  };

  const handleSelectPost: GenericPostCrudOperation = (
    postId: Nullable<number>
  ): void => {
    if (isNull(postId)) return setSelectedPost(null);

    const postToSelect = getById(+postId);
    setSelectedPost(postToSelect);
  };

  const handleEditPost = (postId: number, payload?: Post): void => {
    const postToUpdate = getById(postId);
    if (!postToUpdate || !payload) {
      throw new Error("Invalid post provided");
    }

    const fullPayload = {
      ...selectedPost,
      ...payload,
    };

    setPosts((prevPosts) => [
      fullPayload,
      ...prevPosts.filter((post) => post.id !== fullPayload.id),
    ]);

    setSelectedPost(fullPayload);
  };

  const PostContextValues: PostContextProps = useMemo(
    () => ({
      posts,
      selectedPost,
      getById,
      removePost,
      isLoading,
      selectPost: handleSelectPost,
      editPost: handleEditPost,
    }),
    [posts, selectedPost]
  );

  return (
    <PostContext.Provider value={PostContextValues}>
      {children}
    </PostContext.Provider>
  );
};
