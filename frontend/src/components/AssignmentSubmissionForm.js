import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'; // Or your preferred HTTP library

const AssignmentSubmissionForm = ({ assignmentId, onSubmitSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear previous errors

    const formData = new FormData();
    formData.append('code', selectedFile);

    try {
      const response = await axios.post(`/api/assignments/${assignmentId}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Important for file uploads
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });
      onSubmitSuccess(response.data); // Call the callback on success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="file" onChange={handleFileChange} />
        {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
      </div>

      {error && <div className="error">{error}</div>}

      <button type="submit" disabled={!selectedFile || uploadProgress < 100}>Submit</button>
    </form>
  );
};

AssignmentSubmissionForm.propTypes = {
  assignmentId: PropTypes.number.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default AssignmentSubmissionForm;
