import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // For type checking
import './LessonCard.css'; // Import your CSS file for styling

const LessonCard = ({ lesson }) => {
  return (
    <Link to={`/lessons/${lesson.id}`} className="lesson-card"> 
      <div className="lesson-card-content">
        <h3 className="lesson-card-title">{lesson.title}</h3>
        <p className="lesson-card-week">Week {lesson.week}</p>
        {/* <ul className="lesson-card-objectives">
          {lesson.objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul> */}
      </div>
    </Link>
  );
};

LessonCard.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    week: PropTypes.number.isRequired,
    // objectives: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default LessonCard;
