import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import './AssignmentCard.css'; 
import AssignmentSubmissionForm from './AssignmentSubmissionForm';
import GradeFeedback from './GradeFeedback';
import { useAuth } from '../hooks/useAuth';

const AssignmentCard = ({ lesson_id }) => {
  const { user, authTokens } = useAuth();
  const[assignment, setAssignment] = useState();
  const[message, setMessage] = useState();

 useEffect(() => {
  const fetchAssignment = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/v1/assignments/${lesson_id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.accessToken}`
        }
      });

      if (res.ok) {
        const {assignment} = res.json();
        setAssignment(assignment);
        return
      }

      const {message} = res.json();
      throw new Error(message);
    } catch (error) {
      setMessage(message);
    }
  }

  if (user) {
    fetchAssignment();
  }
 }, [lesson_id, user, authTokens.accessToken, message])

  // Determine status (e.g., "Not submitted", "Submitted", "Overdue") based on assignment and student data
  // const assignmentStatus = getAssignmentStatus(assignment);

  return (
    <div>
      <h4>Assignment</h4>
      {
      message ? <h1>{message}</h1> : 
      ( 
        <div className="assignment-card-content">
          <h3 className="assignment-card-title">{assignment.title}</h3>
          <p className="assignment-card-due-date">
            Due: {new Date(assignment.dueDate).toLocaleDateString()}
          </p>
          <p className="assignment-card-status">
            {/* Status: {assignmentStatus} */}
          </p>
          {/* Optionally display additional assignment details (e.g., description excerpt) */}
          <AssignmentSubmissionForm assignment_id={assignment.id}/>
          <GradeFeedback />
        </div> 
      )
    }
    </div>
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
// function getAssignmentStatus(assignment) {
//   const now = new Date();
//   if (assignment.submissions && assignment.submissions.length > 0) {
//     return 'Submitted';
//   } else if (now > new Date(assignment.dueDate)) {
//     return 'Overdue';
//   } else {
//     return 'Not submitted';
//   }
// }

export default AssignmentCard;
