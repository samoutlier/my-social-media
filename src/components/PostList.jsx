import Post from "./Post";
import { useContext, useEffect, useState } from "react";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postList, fetching } = useContext(PostListData);

  return <>

    {fetching && <LoadingSpinner />}
    {!fetching && postList.length === 0 && <WelcomeMessage />}
    <div className="posts-conatiner">
      {postList.map((post) => {
        return <Post
          key={post.id}
          post={post}
        />
      })}
    </div >
  </>

}

export default PostList;
