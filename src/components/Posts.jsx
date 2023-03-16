import React from 'react';

const Posts = ({ posts }) => {
  return (
    <div className='posts'>
      {posts.map((post) => {
        return <Post key={post._id} {...post} />;
      })}
    </div>
  );
};

export default Posts;
