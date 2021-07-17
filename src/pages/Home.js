import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { getPosts } from '../services/postService';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';
import Header from '../components/Header';
import Posts from '../components/Posts';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    fetchPosts();
  }, []);

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
        <Sidebar />
      </div>
    </React.Fragment>
  );
};

export default Home;
