import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { FaPlus } from 'react-icons/fa';

import Button from '../components/Button';
import { getCategories } from '../services/categoryService';
import { upload } from '../services/uploadService';
import { createPost } from '../services/postService';
import Loader from '../components/Loader';

const initialState = {
  title: '',
  category: '',
  description: '',
};

const Write = () => {
  const titleRef = useRef();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [inputs, setInputs] = useState(initialState);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newPost = {
      ...inputs,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;

      data.append('name', fileName);
      data.append('file', file);
      newPost.photo = fileName;

      try {
        await upload(data);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }

    try {
      const { data: { post } } = await createPost({ ...newPost });
      setLoading(false);
      window.location.replace(`/post/${post.slug}`);
    } catch (err) {
      setLoading(false);
      console.log(err.response.data.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { token } = axios.CancelToken.source();
        const { data } = await getCategories(token);
        setCategories(data.docs);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled');
        } else {
          console.error(err);
        }
      }
    })();
  }, []);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  return (
    <div>
      <div className='write'>
        {file && (
          <img className='writeImg' src={URL.createObjectURL(file)} alt='' />
        )}
        <form className='writeForm' onSubmit={handleSubmit}>
          <div className='writeFormGroup'>
            <label htmlFor='fileInput'>
              <span className='writeIcon'>
                <FaPlus />
              </span>
            </label>
            <input
              type='file'
              id='fileInput'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type='text'
              name='title'
              placeholder='Title'
              className='writeInput'
              ref={titleRef}
              onChange={handleChange}
            />
          </div>
          <div className='writeFormGroup'>
            <select
              id='category'
              name='category'
              className='writeSelect'
              onChange={handleChange}
            >
              <option>select a category</option>
              {categories.map((category) => {
                return (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='writeFormGroup'>
            <textarea
              name='description'
              placeholder='Tell your story...'
              className='writeInput writeText'
              onChange={handleChange}
            ></textarea>
          </div>
          <Button
            className='writeSubmit'
            disabled={loading}
            text={!loading ? 'Publish' : null}
            disabled={loading}
          >
            {loading ? <Loader size='sm' /> : null}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Write;
