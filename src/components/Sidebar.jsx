import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaPinterestSquare,
  FaInstagramSquare,
} from 'react-icons/fa';

import { getCategories } from '../services/categoryService';

const SideBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const catsFromServer = await fetchCategories();
      setCategories(catsFromServer);
    })();
  }, []);

  const fetchCategories = async () => {
    const { token, cancel } = axios.CancelToken.source();

    try {
      const {
        data: { docs },
      } = await getCategories(token);
      return docs;
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('cancelled');
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className='sidebar'>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>ABOUT ME</span>
        <img
          src='https://i.pinimg.com/236x/1e/3f/58/1e3f587572a7a7b20bbf1828595a1786--holiday-party-themes-holiday-gift-guide.jpg'
          alt=''
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate qui
          necessitatibus nostrum illum reprehenderit.
        </p>
      </div>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>CATEGORIES</span>
        <ul className='sidebarList'>
          {categories && categories.map((category) => {
            const { _id: id, name } = category;
            return (
              <Link
                key={id}
                to={`/?category=${name}`}
                className='link'
              >
                <li className='sidebarListItem'>{name}</li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>FOLLOW US</span>
        <div className='sidebarSocial'>
          <span className='sidebarIcon'>
            <FaFacebookSquare />
          </span>
          <span className='sidebarIcon'>
            <FaTwitterSquare />
          </span>
          <span className='sidebarIcon'>
            <FaPinterestSquare />
          </span>
          <span className='sidebarIcon'>
            <FaInstagramSquare />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
