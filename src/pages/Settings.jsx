import React from 'react';

import { deleteCurrentUser } from '../services/userService';
import { useGlobalContext } from '../context/GlobalState';
import Account from 'components/Account';

const Settings = () => {
  const { user, logout } = useGlobalContext();

  const deleteMe = async () => {
    try {
      await deleteCurrentUser();
      logout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='settings'>
      <div className='settingsWrapper'>
        <div className='settingsTitle'>
          <span className='settingsUpdateTitle'>Update Your Account</span>
          {user.role !== 'admin' && (
            <span className='settingsDeleteTitle' onClick={deleteMe}>
              Delete Account
            </span>
          )}
        </div>
        <Account />
      </div>
      <SideBar />
    </div>
  );
};

export default Settings;
