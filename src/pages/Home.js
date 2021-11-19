import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Header, SideBar, Spinner, Posts } from '../components';
import { getPosts } from '../services/postService';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    fetchPosts();
  }, [search]);

  const fetchPosts = async () => {
    const { data } = await getPosts(search);
    setPosts(data.posts);
    setLoading(false);
  };

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
