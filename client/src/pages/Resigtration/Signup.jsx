import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import './signup.css'

const Signup = () => {
  const [account, setAccount] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let errorMessage = '';

    if (!account.name || !account.email.includes('@')) {
      errorMessage = !account.name ? 'Name is required' : 'Invalid email format';
    } else {
      try {
        await axios.post('http://localhost:8800/account', account);

        // Alert on successful account creation
        window.alert('Account successfully created. Login now!');

        // Navigate to the login page
        navigate('/');
      } catch (err) {
        console.log(err);
        errorMessage = handleErrorResponse(err);
      }
    }

    if (errorMessage) {
      window.alert(errorMessage);
      clearForm();
    }
  };

  const handleErrorResponse = (err) => {
    if (err.response) {
      if (err.response.status === 400) {
        return 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character';
      } else if (err.response.status === 409) {
        return 'Email is already in use';
      }
    }
    return 'Something went wrong';
  };

  const clearForm = () => {
    setAccount({ name: '', email: '', password: '' });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="signup-container">
      <div className="login-form">
        <h1>PRODUCE101</h1>

        <div className="signin-up-links">
          <NavLink to="/" className="ssignin-link">
            Sign In
          </NavLink>
          
          <span>&emsp;&emsp;&emsp;</span>
          <NavLink to="/signup" className="ssignup-link">
            Sign Up
          </NavLink>
        </div>

        <input
          type="text"
          placeholder="Name"
          onChange={handleChange}
          name="name"
          value={account.name}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={handleChange}
          name="email"
          value={account.email}
        />

        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={account.password}
          />
          <div className="signin-show-pass" onClick={togglePasswordVisibility}>
            {showPassword ? <span>&#128065;</span> : <span>&#128064;</span>}
          </div>
        </div>

        <button onClick={handleClick}>SIGN UP</button>
      </div>
    </div>
  );
};

export default Signup;
