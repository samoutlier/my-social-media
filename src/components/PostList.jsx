import Post from "./Post";
import { useContext, useEffect, useState } from "react";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postList, addInitialPosts } = useContext(PostListData);
  let [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    fetch('https://dummyjson.com/posts')
      .then(res => res.json())
      .then((data) => {
        setFetching(false);
        addInitialPosts(data.posts);
      });
  }, []);



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
