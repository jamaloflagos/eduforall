import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student', // Default to 'student'
    firstname: '',
    lastname: '',
    middlename: '', // Optional
    location: '', // Optional
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const { register } = useAuth();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); 
    };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
        setMessage("Please select a file.");
        return;
    }

    formData.append('profile_picture', selectedFile);
    try {
      await register(formData);
    } catch (err) {
      setError(err.message); // More specific error handling on backend
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <label htmlFor="firstname">First Name:</label>
        <input 
          type="text" 
          id="firstname" 
          value={formData.firstname} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label htmlFor="lastname">Last Name:</label>
        <input 
          type="text" 
          id="lastname" 
          value={formData.lastname} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label htmlFor="middlename">Middle Name(Optional):</label>
        <input 
          type="text" 
          id="middlename" 
          value={formData.middlename} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label htmlFor="location">Location(Optional):</label>
        <input 
          type="location" 
          id="location" 
          value={formData.location} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label htmlFor="profile_picture">Profile Picture(Optional):</label>
        <input type="file" name="profile_picture" id="profile_picture" onChange={handleFileChange}/>
        {message && <div>{message}</div>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default RegisterPage;
