import React from 'react';

import SideBar from '../components/Sidebar';
import SinglePost from '../components/SinglePost';

const Single = () => {
  return (
    <div className='single'>
      <SinglePost />
      <SideBar />
    </div>
  );
};

export default Single;
