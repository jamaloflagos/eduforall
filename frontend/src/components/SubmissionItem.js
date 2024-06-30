import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GradeFeedbackForm from './GradeFeedbackForm'; // Assuming you have this component
import { useAuth } from '../hooks/useAuth';

const SubmissionItem = ({ submission }) => {
  const [showGrading, setShowGrading] = useState(false);
  const { authTokens } = useAuth();

  const handleGradeSubmit = async (grade, feedback) => {
    try {
      const response = await fetch(`https://eduforall.vercel.app/api/submissions/${submission.id}/grade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.accessToken}`
        },
        body: JSON.stringify({ grade, feedback })
      });

      if (!response.ok) {
        throw new Error('Failed to submit grade and feedback.');
      }

      // Handle successful submission (e.g., update submission status, close form)
      setShowGrading(false); 
    } catch (error) {
      console.error('Error submitting grade and feedback:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <li>
      <div>
        <b>Student:</b> {submission.student.username}
        <br />
        <b>Assignment:</b> {submission.assignment.title}
        <br />
        <b>Submitted:</b> {new Date(submission.submitted_at).toLocaleDateString()}
      </div>
      <Link to={`/submissions/${submission.id}`}>View Submission</Link>
      <button onClick={() => setShowGrading(!showGrading)}>Grade</button>
      {showGrading && <GradeFeedbackForm onSubmit={handleGradeSubmit} />}
    </li>
  );
};

SubmissionItem.propTypes = {
  submission: PropTypes.shape({
    id: PropTypes.number.isRequired,
    student: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    assignment: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    submitted_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default SubmissionItem;
