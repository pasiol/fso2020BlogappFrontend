import React from 'react';
import BlogDetails from './BlogDetails';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <BlogDetails buttonLabel="view" blog={blog} />
    </div>
  );
};

export default Blog;
