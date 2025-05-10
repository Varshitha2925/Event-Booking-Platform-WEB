import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if(role === "user" ){
    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        email,
        password,
      });

      console.log("response",response)

      if (response.statusText === "OK") {
        console.log('Login successful');
        localStorage.setItem('userId', response.data.user._id); // Save token to local storage
        console.log('userId', response.data.user._id)
        navigate('/dashboard')
        if(response.data.user.verified === "true"){
        ; // Redirect to user/organizer dashboard
        }
        else{
          navigate('/')
        }

      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      console.error('Login error:', err);
    }
  }
  else if(role === "organizer"){
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password,
      });

      console.log("response",response)

      if (response.statusText === "OK") {
        console.log('Login successful');
        localStorage.setItem('organizerId', response.data.user._id); // Save token to local storage
        if(response.data.user.verified === "true"){
          navigate('/organizer-dashboard'); // Redirect to user/organizer dashboard
          }
          else{
            navigate('/')
          }
        
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      console.error('Login error:', err);
    }
  
  }
  else{
    navigate('/admin-dashboard');
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

        <label htmlFor="role">Role:</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="organizer">Organizer</option>
          <option value="admin">Admin</option>
        </select>

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
