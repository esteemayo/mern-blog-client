import React, { useState } from 'react';

import Button from './Button';
import { updateUserPassword } from '../services/userService';
import { UPDATE_START } from '../context/auth/AuthTypes';
import { useGlobalContext } from '../context/auth/AuthContext';

const initialState = {
  password: '',
  passwordCurrent: '',
  passwordConfirm: '',
};

const UserPassword = () => {
  const { inputs, setInputs } = useState(initialState);
  const [password, setPassword] = useState('');
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { error, dispatch, updateSuccess, updateFailure } = useGlobalContext();

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: UPDATE_START });

    try {
      const { data } = await updateUserPassword({ ...inputs });
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
          onChange={handleChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          placeholder='********'
          onChange={handleChange}
        />
        <label htmlFor='passwordConfirm'>Confirm Password</label>
        <input
          type='password'
          id='passwordConfirm'
          placeholder='********'
          onChange={handleChange}
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
