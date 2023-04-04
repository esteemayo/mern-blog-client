import React, { useState } from 'react';
import { KeyboardArrowUpOutlined } from '@mui/icons-material';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  window.onscroll = () => {
    setIsVisible(window.pageYOffset > 500 ? true : false);
    return () => (window.onscroll === null);
  }

  return (
    <div className='backtotopContainer'>
      <div className='iconWrapper'>
        <KeyboardArrowUpOutlined />
      </div>
    </div>
  );
};

export default BackToTop;
