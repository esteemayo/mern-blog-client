import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Header from 'components/Header';
import { getPosts } from 'services/postService';
import Posts from 'components/Posts';
import SideBar from 'components/Sidebar';
import axios from 'axios';

const Home = () => {
  const { search } = useLocation();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { token } = axios.CancelToken.source();
        const { data } = await getPosts(search, token);
        setPosts(data.posts);
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled');
        } else {
          console.log(err);
          setLoading(false);
        }
      }
    })();
  }, [search]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <React.Fragment>
      <Header />
      <div className='home'>
        <Posts posts={posts} />
        <SideBar />
      </div>
    </React.Fragment>
  );
};

export default Home;
