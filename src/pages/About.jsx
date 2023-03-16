import React from 'react';
import PropTypes from 'prop-types';

const About = ({ title }) => {
  return (
    <div className='about'>
      <h1 className='about-header'>{title}</h1>
      <p>MERN Blog Application</p>
      <p>Version: 1.0.0</p>
    </div>
  );
};

About.defaultProps = {
  title: 'About',
};

About.propTypes = {
  title: PropTypes.string.isRequired,
};

export default About;
