import React from 'react';
import UserData from './UserData';

const Account = () => {
  return (
    <div>
      <UserData />
      <div className='space'></div>
      <UserPassword />
    </div>
  );
};

export default Account;
