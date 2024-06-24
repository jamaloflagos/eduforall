import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // For decoding JWT tokens
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() => 
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );
  const [user, setUser] = useState(() => {
    if (authTokens) {
      return jwtDecode(authTokens.accessToken);
    } else {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  const loginUser = async (email, password) => {
    const formData = {email, password}
    const res = await fetch('http://localhost:4000/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
          "Content-Type": 'application/json'
      }
    });

    if (!res.ok) {
      const data = await res.json();
      console.log(data, data.message);
      setMessage(data.message);

      return;
    }

    const data = await res.json();
    console.log(data);
    setAuthTokens(data);
    setUser(jwtDecode(data.accessToken));
    console.log(jwtDecode(data.accessToken));
    localStorage.setItem('authTokens', JSON.stringify(data));
  };

  const registerUser = async (formData) => { 
    console.log('register user')
    const res = await fetch('http://localhost:4000/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
          "Content-Type": 'application/json'
      }
    });
    // You might want to redirect or handle success here
    if (!res.ok) {
      const data = await res.json();
      console.log(data, data.message);
      setMessage(data.message);

      return
    }

    const data = await res.json();
    console.log(data, data.message);
    setMessage(data.message);
    navigate('/login');
  };

  const logoutUser = async () => {
    const res = await fetch('http://localhost:4000/api/v1/auth/logout', {
      method: 'POST',
    })

    if (res.ok) {
      setAuthTokens(null);
      setUser(null);
      localStorage.removeItem('authTokens');
    }
  };

  const updateToken = async () => {
    // Logic to refresh the access token using the refresh token
    // ...
    const res = await fetch('http://localhost:4000/api/auth/refresh', {
      method: 'POST'
    })

    if (!res.ok) {
      const {error} = await res.json()
      throw Error(error);
    }

    const { token: accessToken } = await res.json()
    setAuthTokens(accessToken);
    setUser(jwtDecode(accessToken));
    localStorage.setItem('authTokens', JSON.stringify(accessToken));
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.accessToken)); 
    }
    setLoading(false); 
  }, [authTokens, loading]); 

  let contextData = {
    user,
    authTokens,
    message,
    loginUser,
    registerUser,
    logoutUser
  };

  // Update token every 10 minutes if authenticated
  useEffect(() => {
    if (authTokens) {
      const interval = setInterval(() => {
        updateToken();
      }, 10 * 60 * 1000); // 10 minutes * 60 seconds * 1000 milliseconds
      return () => clearInterval(interval); // Clear interval on unmount
    }
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
