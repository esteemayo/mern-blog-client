import React from 'react';
import { UserData, UserPassword } from './index';

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
