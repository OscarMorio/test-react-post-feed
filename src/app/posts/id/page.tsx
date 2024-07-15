"use client";
import PostDetails from "@/components/post-details/post-details";
import { getIdFromURI } from "@/shared/utilities/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const Page = () => {
  const pathname = usePathname();
  const postId = getIdFromURI(pathname);
  const searchParams = useSearchParams();
  const editingParam = searchParams.get("edit");
  const isEditing = !!(editingParam ?? editingParam === "true")

  if (!postId || isNaN(+postId)) {
    return <>Invalid URL</>;
  }

  return <PostDetails postId={+postId} isEditing={isEditing} />;
};
export default Page;
