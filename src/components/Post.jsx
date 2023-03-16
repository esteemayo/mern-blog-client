import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ slug, photo, title, category, createdAt, description }) => {
  const PF = 'http://localhost:8080/images/';

  return (
    <div className='post'>
      {photo && <img className='postImg' src={PF + photo} alt='' />}
      <div className='postInfo'>
        <div className='postCats'>
          <span className='postCat'>{category}</span>
        </div>
        <Link to={`/post/${slug}`} className='link'>
          <span className='postTitle'>{title}</span>
        </Link>
        <hr />
        <span className='postDate'>{new Date(createdAt).toDateString()}</span>
      </div>
      <p className='postDesc'>{description}</p>
    </div>
  );
};

export default Post;
