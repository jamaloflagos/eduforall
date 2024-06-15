import React from 'react';
import PropTypes from 'prop-types';
import './GradeFeedback.css'; // Your custom CSS for styling

const GradeFeedback = ({ grade, feedback }) => {
  // Determine status (e.g., 'Pending', 'Graded') based on grade availability
  const status = grade ? 'Graded' : 'Pending';

  return (
    <div className="grade-feedback">
      <h4 className="grade-feedback-title">Assignment Feedback</h4>
      <div className="grade-feedback-status">
        Status: {status}
      </div>
      {grade && (
        <div className="grade-feedback-details">
          <p className="grade-feedback-grade">Grade: {grade}</p>
          {feedback && <p className="grade-feedback-feedback">{feedback}</p>}
        </div>
      )}
    </div>
  );
};

GradeFeedback.propTypes = {
  grade: PropTypes.number, 
  feedback: PropTypes.string
};

export default GradeFeedback;
