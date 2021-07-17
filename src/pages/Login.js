import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useGlobalContext } from '../context/GlobalState';
import { loginUser } from '../services/userService';
import Button from '../components/Button';

const Login = () => {
  const { isFetching, dispatch, loginSuccess, loginFailure } =
    useGlobalContext();
  const passwordRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    try {
      const userData = {
        username: userRef.current.value,
        password: passwordRef.current.value,
      };

      const { data } = await loginUser(userData);
      loginSuccess(data);
    } catch (err) {
      loginFailure();
      console.log(err);
    }
  };

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
        <Button className='loginButton' text='Login' disabled={isFetching} />
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
