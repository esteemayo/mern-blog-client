import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from 'components/Header';
import { getPosts } from 'services/postService';
import Posts from 'components/Posts';
import SideBar from 'components/Sidebar';

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
