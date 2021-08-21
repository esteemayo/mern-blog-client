import React from 'react';

import SinglePost from '../components/SinglePost';
import Sidebar from '../components/Sidebar';

const Single = () => {
  return (
    <div className='single'>
      <SinglePost />
      <Sidebar />
    </div>
  );
};

export default Single;
