"use client";
import { Post } from "@/shared/models/base-models";
import { GenericPostCrudOperation, Nullable } from "@/shared/models/base-types";
import { getPostDataFromAPI } from "@/shared/services/api-service";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface useApiDataReturn {
  posts: Post[];
  setPosts:  Dispatch<SetStateAction<Post[]>>
  selectedPost: Nullable<Post>;
  removePost: GenericPostCrudOperation;
  isLoading: boolean;
  setSelectedPost: Dispatch<SetStateAction<Nullable<Post>>>;
}

export const useApiData = (): useApiDataReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Nullable<Post>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const removePost = (postId: Nullable<number>) => {
    setPosts((prevPosts) => {
      return prevPosts.filter((post) => post.id !== postId);
    });
  };

  useEffect(() => {
    getPostDataFromAPI()
      .then((response) => {
        setPosts(response);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const store: useApiDataReturn = useMemo(
    () => ({
      posts,
      setPosts,
      selectedPost: selectedPost,
      removePost,
      isLoading: isLoading,
      setSelectedPost,
    }),
    [posts, selectedPost, isLoading]
  );

  return store;
};
