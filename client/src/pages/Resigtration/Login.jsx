import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import './login.css'

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(false);
    setErrorMessage('');
  };

  // Handle button click to log in
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8800/login', loginData);
      // If login is successful, redirect based on the user's role
      const { role } = response.data;
      if (role === 'admin') {
        navigate('/produce');
      } else {
        navigate('/marketplace');
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        window.alert('Invalid email or password');
      } else {
        window.alert('Something went wrong');
      }
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>PRODUCE101</h1>

        <div className="signin-up-links">
          <NavLink to="/" className="signin-link">Sign In</NavLink>

          <span>&emsp;&emsp;&emsp;</span>

          <NavLink to="/signup" className="signup-link" > Sign Up </NavLink>
        </div>


        <input
          type="text"
          placeholder="Email"
          onChange={handleChange}
          name="email"
          value={loginData.email}
        />

        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={loginData.password}
          />
          <div className="show-pass" onClick={togglePasswordVisibility}>
            {showPassword ? <span>&#128065;</span> : <span>&#128064;</span>}
          </div>
        </div>

        <button onClick={handleLogin}>SIGN IN</button>
        {error && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
