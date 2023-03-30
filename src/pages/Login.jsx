import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import Button from '../components/Button';
import { useGlobalContext } from '../context/auth/AuthContext';
import { loginUser } from '../services/userService';
import { LOGIN_START } from '../context/auth/AuthTypes';
import Loader from '../components/Loader';

const Login = () => {
  const { error, message, isFetching, dispatch, loginSuccess, loginFailure } =
    useGlobalContext();
  const passwordRef = useRef(null);
  const userRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: LOGIN_START });

    try {
      const userData = {
        username: userRef.current.value,
        password: passwordRef.current.value,
      };

      const { data } = await loginUser({ ...userData });
      loginSuccess(data.details);
    } catch (err) {
      loginFailure(err.response.data);
      console.log(err);
    }
  };

  useEffect(() => {
    error && toast.error(message);
  }, [error, message]);

  return (
    <div className='login'>
      <span className='loginTitle'>Login</span>
      <form className='loginForm' onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          className='loginInput'
          placeholder='Enter your username...'
          autoFocus
          ref={userRef}
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          className='loginInput'
          placeholder='********'
          ref={passwordRef}
        />
        <Button
          text={isFetching ? null : 'Login'}
          className='loginButton'
          disabled={isFetching}
        >
          {isFetching ? <Loader size='sm' /> : null}
        </Button>
      </form>
      <Button className='loginRegisterButton'>
        <Link className='link' to='/users/register'>
          Register
        </Link>
      </Button>
    </div>
  );
};

export default Login;
