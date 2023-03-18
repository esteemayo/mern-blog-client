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

Posts.propTypes = {
  posts: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
};

export default Posts;
