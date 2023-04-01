import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaPinterestSquare,
  FaInstagramSquare,
  FaSearch,
} from 'react-icons/fa';

import { useGlobalContext } from '../context/auth/AuthContext';

const PF = 'http://localhost:8080/images/';

const Topbar = () => {
  const { user, logout } = useGlobalContext();

  return (
    <div className='top'>
      <div className='topLeft'>
        <span className='topIcon'>
          <FaFacebookSquare />
        </span>
        <span className='topIcon'>
          <FaTwitterSquare />
        </span>
        <span className='topIcon'>
          <FaPinterestSquare />
        </span>
        <span className='topIcon'>
          <FaInstagramSquare />
        </span>
      </div>
      <div className='topCenter'>
        <ul className='topList'>
          <li className='topListItem'>
            <Link className='link' to='/'>
              HOME
            </Link>
          </li>
          <li className='topListItem'>
            <Link className='link' to='/about'>
              ABOUT
            </Link>
          </li>
          <li className='topListItem'>
            <Link className='link' to='/'>
              CONTACT
            </Link>
          </li>
          {user && (
            <li className='topListItem'>
              <Link className='link' to='/write'>
                WRITE
              </Link>
            </li>
          )}
          {user && user.role === 'admin' && (
            <li className='topListItem'>
              <Link className='link' to='/category'>
                CATEGORY
              </Link>
            </li>
          )}
          <li className='topListItem' onClick={logout}>
            {user && 'LOGOUT'}
          </li>
        </ul>
      </div>
      <div className='topRight'>
        {user ? (
          <Link to='/account/settings' className='link'>
            <img
              className='topImg'
              src={PF + user.avatar}
              alt={user.username}
            />
          </Link>
        ) : (
          <ul className='topList'>
            <li className='topListItem'>
              <Link className='link' to='/auth/login'>
                LOGIN
              </Link>
            </li>
            <li className='topListItem'>
              <Link className='link' to='/users/register'>
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <span className='topSearchIcon'>
          <FaSearch />
        </span>
      </div>
    </div>
  );
};

export default Topbar;
