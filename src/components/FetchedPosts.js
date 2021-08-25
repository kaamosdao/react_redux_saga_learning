import React from 'react';
import Post from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { requestPost } from '../redux/actions';
import Loader from './Loader';

const FetchedPosts = () => {
  const dispatch = useDispatch();
  const asyncPosts = useSelector((state) => state.posts.fetchedPosts);
  const loading = useSelector((state) => state.app.loading);

  if (loading) {
    return <Loader />;
  }

  if (!asyncPosts.length) {
    return (
      <button
        onClick={() => dispatch(requestPost())}
        className="btn btn-primary"
      >
        Upload
      </button>
    );
  }
  return asyncPosts.map((post) => <Post post={post} key={post.id} />);
};

export default FetchedPosts;
