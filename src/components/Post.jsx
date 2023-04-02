import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Post = ({ slug, photo, title, category, createdAt, description }) => {
  const PF = 'http://localhost:8080/images/';

  return (
    <div className='post'>
      {photo ? (
        <img
          className='postImg'
          src={PF + photo}
          alt=''
        />
      ) : (
        <img
          className='postImg'
          src='https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGJsb2clMjBwb3N0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
          alt=''
        />
      )}
      <div className='postInfo'>
        <div className='postCats'>
          <span className='postCat'>{category}</span>
        </div>
        <Link to={`/post/${slug}`} className='link'>
          <span className='postTitle'>{title}</span>
        </Link>
        <hr />
        <span className='postDate'>
          {new Date(createdAt).toDateString()}
        </span>
      </div>
      <p className='postDesc'>{description.substr(0, 200)}...</p>
    </div>
  );
};

Post.propTypes = {
  _id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Post;
