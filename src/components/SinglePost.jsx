import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import Button from './Button';
import { useGlobalContext } from '../context/auth/AuthContext';
import defaultImg from '../images/default.avif';
import * as postAPI from '../services/postService';
import Loader from './Loader';

const PF = 'http://localhost:8080/images/';

const SinglePost = () => {
  const { slug } = useParams();
  const { user } = useGlobalContext();

  const [post, setPost] = useState({});
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState('');

  const handleUpdate = async (postId) => {
    setLoading(true);

    try {
      const postBody = {
        title,
        description,
      };

      await postAPI.updatePost(postId, postBody);
      setLoading(false);
      setIsEditing(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await postAPI.deletePost(postId);
      window.location.replace('/');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    slug && (async () => {
      try {
        const { data } = await postAPI.getPostWithSlug(slug, token);
        setPost(data.post);
        setTitle(data.post.title);
        setDescription(data.post.description);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled');
        } else {
          console.log(err);
        }
      }
    })();
  }, [slug]);

  return (
    <div className='singlePost'>
      <div className='singlePostWrapper'>
        {post.photo ? (
          <img src={PF + post.photo} alt='' className='singlePostImg' />
        ) : (
          <img
            src={defaultImg}
            alt=''
            className='singlePostImg'
          />
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
                <span className='singlePostIcon' onClick={() => handleDelete(post._id)}>
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
            text={!loading ? 'Update' : null}
            onClick={() => handleUpdate(post._id)}
            disabled={loading}
          >
            {loading ? <Loader size='sm' /> : null}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
