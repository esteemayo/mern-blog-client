import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import defaultImg from '../images/default.avif';

const Post = ({ slug, photo, title, category, createdAt, description }) => {
  const PF = 'http://localhost:8080/images/';

  return (
    <div className='post'>
      <img
        className='postImg'
        src={PF + photo}
        alt=''
      />
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
  photo: PropTypes.string,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Post;
