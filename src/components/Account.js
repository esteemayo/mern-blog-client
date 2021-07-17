import React from 'react';

import UserPassword from '../components/UserPassword';
import UserData from '../components/UserData';

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
