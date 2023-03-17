import React, { useState } from 'react';

import Button from './Button';
import { updateUserPassword } from '../services/userService';
import { UPDATE_START } from '../context/auth/AuthTypes';
import { useGlobalContext } from '../context/auth/AuthContext';
import { UPDATE_START } from '../context/auth/AuthTypes';
import Button from './Button';

const UserPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { error, dispatch, updateSuccess, updateFailure } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: UPDATE_START });

    const userData = {
      password,
      passwordCurrent,
      passwordConfirm,
    };

    try {
      const { data } = await updateUserPassword(userData);
      updateSuccess(data);
      window.location.reload();
    } catch (err) {
      console.error(err);
      updateFailure();
    }
  };

  return (
    <div>
      <div className='settingsTitle'>
        <h2 className='settingsUpdateTitle'>Password Change</h2>
      </div>
      <hr />
      <form className='settingsForm' onSubmit={handleSubmit}>
        <label htmlFor='passwordCurrent'>Current Password</label>
        <input
          type='password'
          id='passwordCurrent'
          placeholder='********'
          onChange={(e) => setPasswordCurrent(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          placeholder='********'
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor='passwordConfirm'>Confirm Password</label>
        <input
          type='password'
          id='passwordConfirm'
          placeholder='********'
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <Button text='Update' className='settingsSubmit' />
      </form>
      {error && (
        <span style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
          Something went wrong!
        </span>
      )}
    </div>
  );
};

export default UserPassword;
