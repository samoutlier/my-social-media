import { createContext, useReducer } from "react";


export const PostList = createContext({
  postList: [],
  addPost: () => { },
  addInitialPosts: () => { },
  deletePost: () => { },
});

const postListReducer = (currPostList, action) => {

  let newPostList = currPostList;
  if (action.type == "DELETE_POST") {
    newPostList = currPostList.filter((post) => post.id != action.payload.postId);
  }
  else if (action.type == "ADD_POST") {
    newPostList = [action.payload, ...currPostList]
  }
  else if (action.type == "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  }

  return newPostList;
}

const PostListProvider = ({ children }) => {

  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      }
    })
  }

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    })
  }

  const deletePost = (postId) => {
    console.log("DELERE");
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  }

  return (
    <PostList.Provider value={
      {
        postList,
        addPost,
        addInitialPosts,
        deletePost,
      }
    }>
      {children}
    </PostList.Provider>
  );
};


export default PostListProvider;