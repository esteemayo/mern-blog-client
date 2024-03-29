import React, { useEffect, useState } from 'react';

import Button from './Button';
import { updateUserPassword } from '../services/userService';
import { UPDATE_START } from '../context/auth/AuthTypes';
import { useGlobalContext } from '../context/auth/AuthContext';
import Loader from './Loader';

const initialState = {
  password: '',
  passwordCurrent: '',
  passwordConfirm: '',
};

const UserPassword = () => {
  const [inputs, setInputs] = useState(initialState);
  const { error, reset, dispatch, isFetching, updateSuccess, updateFailure } =
    useGlobalContext();

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: UPDATE_START });

    try {
      const { data } = await updateUserPassword({ ...inputs });
      updateSuccess(data.details);
      window.location.reload();
    } catch (err) {
      console.error(err);
      updateFailure();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      reset();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [error]);

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
          name='passwordCurrent'
          placeholder='********'
          onChange={handleChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          name='password'
          type='password'
          placeholder='********'
          onChange={handleChange}
        />
        <label htmlFor='passwordConfirm'>Confirm Password</label>
        <input
          type='password'
          id='passwordConfirm'
          name='passwordConfirm'
          placeholder='********'
          onChange={handleChange}
        />
        <Button
          text={!isFetching ? 'Update' : null}
          className='settingsSubmit'
        >
          {isFetching ? <Loader size='sm' /> : null}
        </Button>
      </form>
      {error && (
        <span className='errorMsg'>
          Something went wrong!
        </span>
      )}
    </div>
  );
};

export default UserPassword;
