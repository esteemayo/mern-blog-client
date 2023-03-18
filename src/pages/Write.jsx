import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

import Button from 'components/Button';
import { getCategories } from 'services/categoryService';
import { upload } from 'services/uploadService';
import { createPost } from 'services/postService';

const Write = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      category,
      description,
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
        console.log(err);
      }
    }

    try {
      const { data: { post } } = await createPost({ ...newPost });
      window.location.replace(`/post/${post.slug}`);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

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
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type='text'
              placeholder='Title'
              className='writeInput'
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='writeFormGroup'>
            <select
              id='categories'
              name='categories'
              className='writeSelect'
              onChange={(e) => setCategory(e.target.value)}
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
              placeholder='Tell your story...'
              className='writeInput writeText'
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <Button text='Publish' className='writeSubmit' />
        </form>
      </div>
    </div>
  );
};

export default Write;
