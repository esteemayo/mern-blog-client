import React from 'react';

import UserData from './UserData';
import UserPassword from './UserPassword';

const Account = () => {
  return (
    <div className='account'>
      <UserData />
      <div className='space'></div>
      <UserPassword />
    </div>
  );
};

export default Account;
