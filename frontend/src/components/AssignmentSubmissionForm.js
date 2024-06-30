import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';

const AssignmentSubmissionForm = ({ assignment_id }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [jsMessage, setJSMessage] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const {authTokens} = useAuth();

    const handleFileChange = (event) => {
      const file = event.target.files[0]
      const fileName = file.name;
      const extension = fileName.split('.').pop().toLowerCase();
      if (!extension === 'js') {
        setJSMessage("Please select an js file.");
        return;
      }
      setJSMessage(null);
      setSelectedFile(file); 
    };

    const handleUpload = async (e) => {
      e.preventDefault()
      if (!selectedFile) {
          setMessage("Please select a file.");
          return;
      }

      const formData = new FormData();
      formData.append('assignment_answer', selectedFile);
      
      try {
          const res = await fetch(`https://eduforall.vercel.app/api/v1/assignments/${assignment_id}/submit`, { 
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
            setHasSubmitted(true);
          }
      } catch (error) {
          console.error('Error uploading file:', error);
      }
  };
  
  useEffect(() => {
    // Fetch submission status from API endpoint (see backend implementation below)
    const fetchSubmissionStatus = async () => {
      console.log(assignment_id);
      try {
        const res = await fetch(`https://eduforall.vercel.app/api/v1/assignments/${assignment_id}/submission-status`,{ 
          headers: {
            'Authorization': `Bearer ${authTokens.accessToken}`
          }
        });
        if (res.ok && res.status === 200) {
          const data = await res.json();
          console.log(data)
          setHasSubmitted(data.hasSubmitted);
          console.log(hasSubmitted)
          return
        }

        // if (res.status === 204) {
        //   const data = await res.json();
        //   console.log(data)
        // }

        const data = await res.json();
        throw new Error(data.message);
      } catch (err) {
        console.log(err)
        setMessage(err.message);
      }
    }

    if (assignment_id) {
      fetchSubmissionStatus();
    }
  }, [assignment_id, hasSubmitted]);
  return (

  <div>
  {hasSubmitted ? (
    <p>You have submitted an answer for this assignment.</p>
  ) : (
    <form encType="multipart/form-data" onSubmit={handleUpload}>
      <label htmlFor="assignment_answer">Submit your answer:</label> <br />
      <input type="file" name="assignment_answer" id="assignment_answer" onChange={handleFileChange}/>
      {jsMessage && <p>{jsMessage}</p>}
      <button type="submit">Submit Answer</button>
      {message && <h1>{message}</h1>}
    </form>
  )}
  {!hasSubmitted && <p>You have not submit an answer for this assignment, go ahead and tackle your task!!</p>}
</div>
  );
};

AssignmentSubmissionForm.propTypes = {
  assignment_id: PropTypes.number.isRequired,
  // onSubmitSuccess: PropTypes.func.isRequired,
};

export default AssignmentSubmissionForm;
