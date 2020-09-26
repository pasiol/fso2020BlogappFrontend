import React from 'react';
import Togglable from './Togglable';

const BlogForm = ({
  user,
  addBlog,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  blogFormRef,
}) => {
  if (user != null) {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <p>
            title:{' '}
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </p>
          <p>
            author:{' '}
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </p>
          <p>
            url:{' '}
            <input
              type="text"
              value={url}
              name="URL"
              onChange={({ target }) => setUrl(target.value)}
            />
          </p>
          <button type="submit">create</button>
        </form>
      </Togglable>
    );
  } else {
    return <></>;
  }
};

export default BlogForm;
