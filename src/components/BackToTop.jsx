import React, { useState } from 'react';
import { KeyboardArrowUpOutlined } from '@mui/icons-material';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  window.onscroll = () => {
    setIsVisible(window.pageYOffset > 500 ? true : false);
    return () => (window.onscroll === null);
  };

  const scrollHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='backtotopContainer'>
      {isVisible && (
        <div className='iconWrapper' onClick={scrollHandler}>
          <KeyboardArrowUpOutlined />
        </div>
      )}
    </div>
  );
};

export default BackToTop;
