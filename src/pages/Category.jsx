import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { createCategory } from 'services/categoryService';
import { useGlobalContext } from 'context/auth/AuthContext';
import Button from 'components/Button';

const Category = () => {
  const { user } = useGlobalContext();
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name };

    try {
      await createCategory(data);
      window.location.reload();
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  if (user && user.role !== 'admin') return <Redirect to='/' />;

  return (
    <form className='writeForm' onSubmit={handleSubmit}>
      <div className='writeFormGroup'>
        <input
          type='text'
          placeholder='Name'
          className='writeInput'
          autoFocus={true}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <Button text='Add' className='writeSubmit' />
    </form>
  );
};

export default Category;
