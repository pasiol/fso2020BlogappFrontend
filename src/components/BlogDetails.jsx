import React, { useState } from 'react';
import DeleteButton from './DeleteButton';

const BlogDetails = (props) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  console.log('BlogDetails props: ', props);

  const addVote = async (event) => {
    event.preventDefault();
    props.updateBlog({
      id: props.blog.id,
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: ++props.blog.likes,
    });
  };

  const deleteBlog = async (event) => {
    event.preventDefault();
    if (
      window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author}`)
    ) {
      props.removeBlog({
        id: props.blog.id,
        title: props.blog.title,
        author: props.blog.author,
        url: props.blog.url,
        likes: props.blog.likes,
      });
    }
  };

  return (
    <>
      <div style={hideWhenVisible}>
        {props.blog.title}
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        <br />
        {props.blog.author}
      </div>
      <div style={showWhenVisible}>
        {props.blog.title}
        <button onClick={toggleVisibility}>hide</button>
        <br />
        {props.blog.url}
        <br />
        likes {props.blog.likes}
        <button onClick={addVote}>like</button>
        <br />
        {props.blog.author}
        <br />
        <DeleteButton
          deleteBlog={deleteBlog}
          username={props.blog.user.username}
        />
      </div>
    </>
  );
};

export default BlogDetails;
