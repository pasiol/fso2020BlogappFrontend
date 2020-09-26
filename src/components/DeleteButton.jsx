import React from 'react';

const DeleteButton = ({ username, deleteBlog }) => {
  console.log('user', username);
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
  const user = JSON.parse(loggedUserJSON);
  if (username === user.username) {
    return <button onClick={deleteBlog}>delete</button>;
  } else {
    return <></>;
  }
};

export default DeleteButton;
