const WelcomeMessage = ({ onFetchPostsClick }) => {
  return <>
    <center className="welcome-message"><h1 >There is no post available as of now !</h1>
      <button type="button" className="btn btn-primary fetch-post-button"
        onClick={onFetchPostsClick}>
        Fetch Posts</button>
    </center>
  </>
}

export default WelcomeMessage;
