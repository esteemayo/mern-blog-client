import React from 'react';
import { SideBar, SinglePost } from '../components';

const Single = () => {
  return (
    <div className='single'>
      <SinglePost />
      <SideBar />
    </div>
  );
};

export default Single;
