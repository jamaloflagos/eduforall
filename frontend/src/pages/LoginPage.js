import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser, message } =  useAuth();// Use the login function from context
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password)
      await loginUser(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input 
          type="text" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          // required 
          />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          // required 
        />
      </div>
      {message && <div className="message">{message}</div>}
      <button type="submit">Login</button>
    </form>

    <div>
      <h4>Don't have an account yet?</h4>
      <Link to='/register'>Register</Link>
    </div>
    </div>
  );
};

export default LoginPage;
