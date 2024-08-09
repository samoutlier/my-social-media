import Post from "./Post";
import { useContext } from "react";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";

const PostList = () => {
  const { postList, addInitialPosts } = useContext(PostListData);

  const onFetchPostsClick = () => {
    fetch('https://dummyjson.com/posts')
      .then(res => res.json())
      .then((data) => {
        console.log(data.posts);
        addInitialPosts(data.posts);
      });
  }

  return <>

    {postList.length === 0 && <WelcomeMessage onFetchPostsClick={onFetchPostsClick} />}
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
