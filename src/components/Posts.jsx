import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const Posts = ({ posts }) => {
  return (
    <div className='posts'>
      {posts?.map((post) => {
        return <Post key={post._id} {...post} />;
      })}
    </div>
  );
};

export default Posts;
