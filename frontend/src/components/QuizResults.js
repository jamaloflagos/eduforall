import React from 'react';
import PropTypes from 'prop-types';

const QuizResults = ({ quizResults }) => {
  // Assuming quizResults is an array of { questionId, isCorrect } objects

  return (
    <div>
      <h3>Quiz Results</h3>
      <ul>
        {quizResults.map((result) => (
          <li key={result.questionId}>
            {result.questionText}: {result.isCorrect ? 'Correct' : 'Incorrect'}
          </li>
        ))}
      </ul>
      {/* Display overall score or other summary information */}
    </div>
  );
};

QuizResults.propTypes = {
  quizResults: PropTypes.arrayOf(
    PropTypes.shape({
      questionId: PropTypes.number.isRequired,
      isCorrect: PropTypes.bool.isRequired,
      // ... other result properties
    })
  ).isRequired,
};

export default QuizResults;
