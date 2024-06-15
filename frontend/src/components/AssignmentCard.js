import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './AssignmentCard.css'; 
import AssignmentSubmissionForm from './AssignmentSubmissionForm';
import GradeFeedback from './GradeFeedback';

const AssignmentCard = ({ assignment }) => {
  // Determine status (e.g., "Not submitted", "Submitted", "Overdue") based on assignment and student data
  const assignmentStatus = getAssignmentStatus(assignment);

  return (
    <Link to={`/assignments/${assignment.id}`} className="assignment-card">
      <div className="assignment-card-content">
        <h3 className="assignment-card-title">{assignment.title}</h3>
        <p className="assignment-card-due-date">
          Due: {new Date(assignment.dueDate).toLocaleDateString()}
        </p>
        <p className="assignment-card-status">
          Status: {assignmentStatus}
        </p>
        {/* Optionally display additional assignment details (e.g., description excerpt) */}
        <AssignmentSubmissionForm />
        <GradeFeedback />
      </div>
    </Link>
  );
};

AssignmentCard.propTypes = {
  assignment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    // ... other assignment-related properties (e.g., description)
  }).isRequired,
};

// Helper function to determine assignment status (implementation depends on your data model)
function getAssignmentStatus(assignment) {
  const now = new Date();
  if (assignment.submissions && assignment.submissions.length > 0) {
    return 'Submitted';
  } else if (now > new Date(assignment.dueDate)) {
    return 'Overdue';
  } else {
    return 'Not submitted';
  }
}

export default AssignmentCard;
