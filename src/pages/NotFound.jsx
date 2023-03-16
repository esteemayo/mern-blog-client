import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className='notfound-container'>
      <div className='row'>
        <div className='message'>
          <h1>404</h1>
          <h1>Error</h1>
          <h2>Page not found</h2>
          <h3>
            the requested URL <span className='text-danger'>"{pathname}"</span>{' '}
            was not found
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
