import React from 'react';
import {useRouteMatch } from 'react-router-dom';

import NotFount from '../../components/NotFount';
import Articles from './Articles';

const Blog = () => {

  const match = useRouteMatch({
    path: '/blog/:id',
    sensitive: true
  });

  return (
    <div>
      <div>
        {match ? <Articles match={match} /> : <NotFount />}
      </div>
    </div>
  )
};

export default Blog;
