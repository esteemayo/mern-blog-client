import SideBar from 'components/Sidebar';
import SinglePost from 'components/SinglePost';
import React from 'react';

const Single = () => {
  return (
    <div className='single'>
      <SinglePost />
      <SideBar />
    </div>
  );
};

export default Single;
