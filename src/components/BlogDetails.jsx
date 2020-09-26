import React, { useState } from 'react';
import DeleteButton from './DeleteButton';

const BlogDetails = ({ blog, updateBlog, removeBlog, buttonLabel }) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  console.log('blog: ', blog);

  const addVote = async (event) => {
    event.preventDefault();
    updateBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: ++blog.likes,
    });
  };

  const deleteBlog = async (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog({
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
      });
    }
  };

  return (
    <>
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title}
        <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes}
        <button onClick={addVote}>like</button>
        <br />
        {blog.author}
        <br />
        <DeleteButton deleteBlog={deleteBlog} username={blog.user.username} />
      </div>
    </>
  );
};

export default BlogDetails;
