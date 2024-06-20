import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

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
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {message && <div className="message">{message}</div>}
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
