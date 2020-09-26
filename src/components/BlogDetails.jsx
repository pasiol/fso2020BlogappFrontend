import React, { useState } from 'react';

const BlogDetails = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  console.log('props BlogDetails: ', props);
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
        <button>like</button>
        <br />
        {props.blog.author}
        <br />
      </div>
    </>
  );
});

export default BlogDetails;
