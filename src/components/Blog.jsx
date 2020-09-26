import React from 'react';
import BlogDetails from './BlogDetails';

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <BlogDetails
        buttonLabel="view"
        blog={blog}
        updateBlog={updateBlog}
        removeBlog={removeBlog}
      />
    </div>
  );
};

export default Blog;
