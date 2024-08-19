import { createContext, useState, useEffect, useReducer } from "react";


export const PostList = createContext({
  postList: [],
  addPost: () => { },
  fetching: false,
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
  let [fetching, setFetching] = useState(false);


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

  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('https://dummyjson.com/posts', { signal })
      .then(res => res.json())
      .then((data) => {
        setFetching(false);
        addInitialPosts(data.posts);
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          // Request was aborted, no need to do anything
          console.log('Fetch aborted');
        } else {
          // Handle other errors
          console.error('Fetch error:', error);
          setFetching(false); // Reset fetching state in case of an error
        }
      });

    return () => {
      console.log("Cleaning up UseEffect");
      controller.abort();
    };

  }, []);


  return (
    <PostList.Provider value={
      {
        postList,
        fetching,
        addPost,
        deletePost,
      }
    }>
      {children}
    </PostList.Provider>
  );
};


export default PostListProvider;