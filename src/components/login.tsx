import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        email,
        password,
      });

      if (response.data.success) {
        console.log('Login successful');
        localStorage.setItem('token', response.data.token); // Save token to local storage
        navigate('/dashboard'); // Redirect to user/organizer dashboard
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Login</button>
      </form>

      <p className="register-link">
        Don’t have an account?{' '}
        <a href="/register" onClick={() => navigate('/register')}>
          Register here
        </a>
      </p>
    </div>
  );
};

export default Login;
