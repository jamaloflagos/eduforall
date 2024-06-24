import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; 
// import './StudentProgressCard.css'; 
// import { useAuth } from '../hooks/useAuth';

const StudentProgressCard = ({ student_id }) => {
  const [progressData, setProgressData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const { authTokens } = useAuth();

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const [studentResponse, submissionsResponse] = await Promise.all([
          fetch(`http://localhost:4000/api/students/${student_id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Role': 'tutor'
              // 'Authorization': `Bearer ${authTokens.accessToken}`
            }
          }),
          fetch(`http://localhost:4000/api/submissions/${student_id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Role': 'tutor'
              // 'Authorization': `Bearer ${authTokens.accessToken}`
            }
          }),
        ]);
        
        if (!studentResponse.ok || !submissionsResponse.ok) {
          throw new Error('Network response was not ok.');
        }

        const studentData = await studentResponse.json();
        const submissions = await submissionsResponse.json();
        setStudentData(studentData);

        // ... (rest of the progress calculation logic remains the same as the previous Axios version) ...
        // Calculate lessonsCompleted, totalLessons, assignmentsSubmitted, totalAssignments, averageQuizScore
        // Calculate progress based on submissions and local storage
        const lessonsCompleted = studentData.completed_lessons || [];
        const totalLessons =  await fetch (`http://localhost:4000/api/v1/lessons/`, {
          headers: {
            'Content-Type': 'application/json',
            'Role': 'tutor'
            // 'Authorization': `Bearer ${authTokens.accessToken}`
          }
        });
        let totalAssignments = 0;
        let assignmentsSubmitted = 0;
        let totalQuizScore = 0;
        let completedQuizzes = 0;

        submissions.forEach(submission => {
          if (submission.assignment_id) {
            totalAssignments++;
            assignmentsSubmitted++;
          } else {
            const quizResults = JSON.parse(localStorage.getItem(`quizResults_${submission.lesson_id}`));
            if (quizResults) {
              totalQuizScore += quizResults.score;
              completedQuizzes++;
            }
          }
        });

        const averageQuizScore = completedQuizzes > 0 ? Math.round((totalQuizScore / completedQuizzes) * 100) : 0;


        setProgressData({
          lessonsCompleted: lessonsCompleted.length,
          totalLessons,
          assignmentsSubmitted,
          totalAssignments,
          averageQuizScore,
        });
      } catch (error) {
        console.error('Error fetching student progress:', error);
        setError(error.message); // Set the error message to state
      } finally {
        setLoading(false); // Set loading to false, whether success or failure
      }
    };
  fetchProgress();
  }, [student_id]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  const { lessonsCompleted, totalLessons, assignmentsSubmitted, totalAssignments, averageQuizScore } = progressData;

  return (
    <div className="student-progress-card">
      <h3>{studentData.firstname} {studentData.lastname}</h3>

      {/* Circular Progress Bars with Calculated Values */}
      <CircularProgressbar value={lessonsCompleted} max={totalLessons} text={`${Math.round((lessonsCompleted / totalLessons) * 100)}%`} />
      <p>Lessons Completed</p>

      <CircularProgressbar value={assignmentsSubmitted} max={totalAssignments} text={`${Math.round((assignmentsSubmitted / totalAssignments) * 100)}%`} />
      <p>Assignments Submitted</p>

      <CircularProgressbar value={averageQuizScore} text={`${averageQuizScore}%`} />
      <p>Average Quiz Score</p>
    </div>
  );
};

StudentProgressCard.propTypes = {
  studentId: PropTypes.number.isRequired,
};

export default StudentProgressCard;
