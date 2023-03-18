import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { useGlobalContext } from '../context/auth/AuthContext';
import * as postService from '../services/postService';
import Button from './Button';

const PF = 'http://localhost:8080/images/';

const SinglePost = () => {
  const { slug } = useParams();
  const { user } = useGlobalContext();
  const [post, setPost] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await postService.getPostWithSlug(slug);
      setPost(data.post);
      setTitle(data.post.title);
      setDescription(data.post.description);
    };

    fetchPost();
  }, [slug]);

  const handleUpdate = async () => {
    try {
      const postBody = { title, description };
      await postService.updatePost(post._id, postBody);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await postService.deletePost(post._id);
      window.location.replace('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='singlePost'>
      <div className='singlePostWrapper'>
        {post.photo && (
          <img src={PF + post.photo} alt='' className='singlePostImg' />
        )}

        {isEditing ? (
          <input
            type='text'
            autoFocus
            value={title}
            className='singlePostTitleInput'
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className='singlePostTitle'>
            {title}

            {user && user.username === post.username && (
              <div className='singlePostEdit'>
                <span
                  className='singlePostIcon'
                  onClick={() => setIsEditing(true)}
                >
                  <FaEdit />
                </span>
                <span className='singlePostIcon' onClick={handleDelete}>
                  <FaTrashAlt />
                </span>
              </div>
            )}
          </h1>
        )}

        <div className='singlePostInfo'>
          <span className='singlePostAuthor'>
            Author:
            <Link to={`/?username=${post.username}`} className='link'>
              <b> {post.username}</b>
            </Link>
          </span>
          <span className='singlePostDate'>
            <Moment fromNow>{post.createdAt}</Moment>
          </span>
        </div>

        {isEditing ? (
          <textarea
            className='singlePostDescInput'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p className='singlePostDesc'>{description}</p>
        )}

        {isEditing && (
          <Button
            className='singlePostButton'
            text='Update'
            onClick={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default SinglePost;
