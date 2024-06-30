import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Assignment.css'; 
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

      if (res.status === 204) {
        setMessage('No assignment for this lesson');
        return
      }

      if (res.ok) {
        const data = await res.json();
        setAssignment(data.assignment);
        setMessage(null)
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
 }, [lesson_id]);

  // Determine status (e.g., "Not submitted", "Submitted", "Overdue") based on assignment and student data
  // const assignmentStatus = getAssignmentStatus(assignment);

  return (
    <div className='assignment'>
      <h4>Assignment</h4>
      {
      message === 'No assignment for this lesson' ? <p>{message}</p> : 
      ( 
        <div className="assignment-card-content">
          {assignment && <h3 className="assignment-card-title">{assignment.description}</h3>}
          {assignment && <p className="assignment-card-due-date">
            Due: {new Date(assignment.due_date).toLocaleDateString()}
          </p>}
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

export default AssignmentCard;
