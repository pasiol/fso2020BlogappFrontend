import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import './style.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');
  const [notificationStyle, setNotificationStyle] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user.name);
      blogService.setToken(user.token);
    }
  }, []);

  const notify = (message, style) => {
    setTimeout(() => {
      setNotification(message);
      setNotificationStyle(style);
      setTimeout(() => {
        setNotification('');
        setNotificationStyle('');
      }, 10000);
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);
    try {
      const user = await loginService.login({
        username: username,
        password: password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      setUser(user.name);
      setUsername('');
      setPassword('');
      console.log('login before filtering', blogs);
      console.log('user before filtering', user);
      const usersBlogs = blogs.filter((b) => b.user.username === user.username);
      setBlogs(usersBlogs);
      console.log('login after filtering', blogs);
    } catch (exception) {
      notify('wrong username or password', 'error');
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    blogService.setToken(null);
    setUser(null);
    window.localStorage.removeItem('loggedBlogappUser');
    await blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  const addBlog = async (event) => {
    if (title.length > 0 && author.length > 0 && url.length > 0) {
      event.preventDefault();
      const newBlog = {
        title: title,
        author: author,
        url: url,
      };
      try {
        await blogService.create(newBlog);
        setTitle('');
        setAuthor('');
        setUrl('');
        setBlogs(blogs.concat(newBlog));
        notify(`a new blog ${newBlog.title} added`, 'success');
      } catch (error) {
        notify(`a new blog ${newBlog.title} cannot save: ${error}`, 'error');
      }
      blogFormRef.current.toggleVisibility();
    } else {
      notify('missing information, can not save the blog', 'error');
    }
  };

  return (
    <div>
      <Notification message={notification} style={notificationStyle} />
      <LoginForm
        user={user}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
      <BlogForm
        user={user}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        addBlog={addBlog}
        blogFormRef={blogFormRef}
      />
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.title} blog={blog} />
      ))}
    </div>
  );
};

export default App;
