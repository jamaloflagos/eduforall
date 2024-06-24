import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import './AssignmentCard.css'; 
import AssignmentSubmissionForm from './AssignmentSubmissionForm';
// import GradeFeedback from './GradeFeedback';
import { useAuth } from '../hooks/useAuth';

const AssignmentCard = ({ lesson_id }) => {
  const { user, authTokens } = useAuth();
  const[assignment, setAssignment] = useState();
  const[message, setMessage] = useState();

 useEffect(() => {
  const fetchAssignment = async () => {
    console.log(lesson_id);
    try {
      const res = await fetch(`https://eduforall-backend.vercel.app/api/v1/assignments/${lesson_id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.accessToken}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setAssignment(data.assignment);
        return
      }

      const data = await res.json();
      throw new Error(data.message);
    } catch (err) {
      setMessage(err.message);
    }
  }

  if (user) {
    fetchAssignment();
  }
 }, [lesson_id])

  // Determine status (e.g., "Not submitted", "Submitted", "Overdue") based on assignment and student data
  // const assignmentStatus = getAssignmentStatus(assignment);

  return (
    <div>
      <h4>Assignment</h4>
      {
      message ? <h1>{message}</h1> : 
      ( 
        <div className="assignment-card-content">
          {assignment && <h3 className="assignment-card-title">{assignment.description}</h3>}
          {assignment && <p className="assignment-card-due-date">
            Due: {new Date(assignment.due_date).toLocaleDateString()}
          </p>}
          {/* <p className="assignment-card-status"> */}
            {/* Status: {assignmentStatus} */}
          {/* </p> */}
          {/* Optionally display additional assignment details (e.g., description excerpt) */}
          {assignment && <AssignmentSubmissionForm assignment_id={assignment.id}/>}
          {/* <GradeFeedback /> */}
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