import React, { useState } from 'react';

const BlogDetails = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

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

  return (
    <>
      <div style={hideWhenVisible}>
        {props.blog.title}
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
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
      </div>
    </>
  );
});

export default BlogDetails;
