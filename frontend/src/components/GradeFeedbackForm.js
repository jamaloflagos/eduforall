import React, { useState } from 'react';
import PropTypes from 'prop-types';

const GradeFeedbackForm = ({ submissionId, onSubmit }) => {
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false); // Add submitting state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Disable button during submission
    try {
      await onSubmit(submissionId, parseInt(grade), feedback); 
    } catch (err) {
      setError(err.message || 'An error occurred.'); // Handle errors
    } finally {
      setSubmitting(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grade-feedback-form">
      <div>
        <label htmlFor="grade">Grade:</label>
        <input
          type="number"
          id="grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          min="0"
          max="100"
          required
        />
      </div>
      <div>
        <label htmlFor="feedback">Feedback:</label>
        <textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={submitting}> 
        {submitting ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
};

GradeFeedbackForm.propTypes = {
  submissionId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired, 
};

export default GradeFeedbackForm;
