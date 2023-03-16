import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ icon, text, type, onClick, children, ...rest }) => {
  return (
    <button {...rest} type={type} onClick={onClick}>
      {text} {icon}
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'submit',
};

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.object,
  onClick: PropTypes.func,
};

export default Button;
