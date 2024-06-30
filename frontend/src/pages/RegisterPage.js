import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'

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
  const [imageMessage, setImageMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const { registerUser, message } = useAuth();

    const handleFileChange = (event) => {
      const file = event.target.files[0]
      if (!file.type.startsWith('image/')) {
        setImageMessage("Please select an image.");
        return;
      }

      setImageMessage(null);
      setSelectedFile(file); 
    };

  const handleChange = (e) => {
    const {name, value} = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value 
            }
        })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    formData.profile_picture = selectedFile;
    try {
      await registerUser(formData);
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Register</h2>
      <div>
        <label htmlFor="firstname">First Name:</label>
        <input 
          type="text" 
          id="firstname" 
          name="firstname"
          value={formData.firstname} 
          onChange={handleChange} 
        />
      </div>
      <div>
        <label htmlFor="lastname">Last Name:</label>
        <input 
          type="text" 
          id="lastname" 
          name="lastname"
          value={formData.lastname} 
          onChange={handleChange} 
        />
      </div>
      <div>
        <label htmlFor="middlename">Middle Name(Optional):</label>
        <input 
          type="text" 
          id="middlename" 
          name="middlename"
          value={formData.middlename} 
          onChange={handleChange} 
          />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input 
          type="text" 
          id="email" 
          name="email"
          value={formData.email} 
          onChange={handleChange} 
          />
      </div>
      <div>
        <label htmlFor="location">Location(Optional):</label>
        <input 
          type="text" 
          id="location" 
          name="location"
          value={formData.location} 
          onChange={handleChange} 
          />
      </div>
      <div>
        <label htmlFor="profile_picture">Profile Picture(Optional):</label>
        <input type="file" name="profile_picture" id="profile_picture" onChange={handleFileChange}/>
        {imageMessage && <h5 className='image-message'>{imageMessage}</h5>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          name="password"
          value={formData.password} 
          onChange={handleChange} 
          />
      </div>
      {message && <h4 className="message">{message}</h4>}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
