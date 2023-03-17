import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

import { useGlobalContext } from 'context/auth/AuthContext';
import { updateUserData } from 'services/userService';
import { upload } from '../services/uploadService';
import { UPDATE_START } from '../context/auth/AuthTypes';

const PF = 'http://localhost:8080/images/';

const UserData = () => {
  const { user, dispatch, isFetching, updateSuccess, updateFailure } =
    useGlobalContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: UPDATE_START });

    const userData = {
      name,
      email,
      username,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      userData.avatar = filename;
      try {
        await upload(data);
      } catch (err) {
        console.error(err);
      }
    }

    try {
      const { data } = await updateUserData(userData);
      updateSuccess(data);
      setSuccess(true);
      window.location.reload();
    } catch (err) {
      console.error(err);
      updateFailure();
    }
  };

  return (
    <form className='settingsForm' onSubmit={handleSubmit}>
      <label>Profile Picture</label>
      <div className='settingsPP'>
        {file && (
          <img
            src={file ? URL.createObjectURL(file) : PF + user.avatar}
            alt=''
          />
        )}
        <label htmlFor='fileInput'>
          <span className='settingsPPIcon'>
            <FaUserCircle />
          </span>
        </label>
        <input
          type='file'
          id='fileInput'
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <label htmlFor='name'>Name</label>
      <input
        type='text'
        id='name'
        placeholder={user.name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor='username'>Username</label>
      <input
        type='text'
        id='username'
        placeholder={user.username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor='email'>Email</label>
      <input
        id='email'
        type='email'
        placeholder={user.email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className='settingsSubmit' type='submit'>
        {isFetching ? 'Processing...' : 'Update'}
      </button>
      {success && (
        <span style={successStyling}>Profile has been updated...</span>
      )}
    </form>
  );
};

const successStyling = {
  color: 'green',
  textAlign: 'center',
  marginTop: '20px',
};

export default UserData;
