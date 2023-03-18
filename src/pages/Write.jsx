import { FaPlus } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';

import Button from 'components/Button';
import { getCategories } from 'services/categoryService';
import { upload } from 'services/uploadService';
import { createPost } from 'services/postService';
import axios from 'axios';

const Write = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data.docs);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      category,
      description,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newPost.photo = filename;
      try {
        await upload(data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const { data: post } = await createPost(newPost);
      window.location.replace(`/post/${post.data.post.slug}`);
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
              name='categories'
              id='categories'
              className='writeSelect'
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value=''>select a category</option>
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
              type='text'
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
