import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../components/Button';
import { registerUser } from '../services/userService';
import Loader from '../components/Loader';

const initialState = {
  name: '',
  email: '',
  username: '',
  password: '',
  passwordConfirm: '',
};

const Register = () => {
  const nameRef = useRef();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(initialState);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(false);
    setLoading(true);

    try {
      const res = await registerUser({ ...account });
      setLoading(false);
      res.data && window.location.replace('/auth/login');
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className='register'>
      <span className='registerTitle'>Register</span>
      <form className='registerForm' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          type='text'
          name='name'
          className='registerInput'
          placeholder='Enter your username...'
          onChange={handleChange}
          ref={nameRef}
          autoFocus
        />
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          name='username'
          className='registerInput'
          placeholder='Enter your username...'
          onChange={handleChange}
        />
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          name='email'
          className='registerInput'
          placeholder='you@example.com'
          onChange={handleChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          name='password'
          className='registerInput'
          placeholder='********'
          onChange={handleChange}
        />
        <label htmlFor='passwordConfirm'>Confirm Password</label>
        <input
          type='password'
          id='passwordConfirm'
          name='passwordConfirm'
          className='registerInput'
          placeholder='********'
          onChange={handleChange}
        />
        <button className='registerButton' type='submit'>
          {loading ? <Loader size='sm' /> : 'Register'}
        </button>
      </form>
      <Button className='registerLoginButton'>
        <Link className='link' to='/auth/login'>
          Login
        </Link>
      </Button>
      {error && (
        <span style={{ color: 'red', marginTop: '10px' }}>
          Something went wrong!
        </span>
      )}
    </div>
  );
};

export default Register;
