import React, { useState } from 'react';
import { KeyboardArrowUpOutlined } from '@mui/icons-material';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='backtotopContainer'>
      <div className='iconWrapper'>
        <KeyboardArrowUpOutlined />
      </div>
    </div>
  );
};

export default BackToTop;
