import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';

const AssignmentSubmissionForm = ({ assignment_id }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const {authTokens} = useAuth();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); 
    };

    const handleUpload = async (e) => {
      e.preventDefault()
      if (!selectedFile) {
          setMessage("Please select a file.");
          return;
      }

      const formData = new FormData();
      formData.append('answer', selectedFile);
      try {
          const res = await fetch(`/api/v1/assignments/${assignment_id}/submit`, { 
              method: 'POST',
              body: formData,
              headers: {
                'Authorization': `Bearer ${authTokens.accessToken}`
              }
          });

          if (res.ok) {
            const data = await res.text();
            setMessage(data); 
            setSelectedFile(null);
          }
      } catch (error) {
          console.error('Error uploading file:', error);
      }
  };
  
  useEffect(() => {
    // Fetch submission status from API endpoint (see backend implementation below)
    const fetchSubmissionStatus = async () => {
      try {
        const res = await fetch(`/api/v1/assignments/${assignment_id}/submission-status`,{ 
          headers: {
            'Authorization': `Bearer ${authTokens.accessToken}`
          }
        });
        if (res.ok) {
          const { hasSubmitted } = await res.json();
          setHasSubmitted(hasSubmitted);
        }
        const {message} = await res.json();
        throw new Error(message);
      } catch (error) {
        setMessage(error.message);
      }
    }

    if (assignment_id) {
      fetchSubmissionStatus();
    }
  }, [assignment_id, authTokens.accessToken]);
  return (

  <div>
  {hasSubmitted ? (
    <p>You have already submitted an answer for this assignment. Await your grade!</p>
  ) : (
    <form encType="multipart/form-data" onSubmit={handleUpload}>
      <label htmlFor="answer">Submit your answer:</label> <br />
      <input type="file" name="answer" id="answer" onChange={handleFileChange}/>
      <button type="submit">Submit Answer</button>
      {message && <h1>{message}</h1>}
    </form>
  )}
  {message && <h1>{message}</h1>}
</div>
  );
};

AssignmentSubmissionForm.propTypes = {
  assignmentId: PropTypes.number.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default AssignmentSubmissionForm;
