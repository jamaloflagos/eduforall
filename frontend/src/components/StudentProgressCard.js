import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios'; // Or your preferred HTTP library
import './StudentProgressCard.css'; // Import your custom CSS file for styling

const StudentProgressCard = ({ studentId }) => {
  const [progressData, setProgressData] = useState({
    lessonsCompleted: 0,
    totalLessons: 0,
    averageQuizScore: 0,
    assignmentsSubmitted: 0,
    totalAssignments: 0
  });

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await axios.get(`/api/students/${studentId}`); // Assuming an API endpoint for student progress
        setProgressData(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching progress data:", error);
        // Handle error (e.g., show error message in UI)
      }
    };

    fetchProgressData();
  }, [studentId]); // Re-fetch data when studentId changes

  const percentageLessons = Math.round((progressData.lessonsCompleted / progressData.totalLessons) * 100);
  const percentageAssignments = Math.round((progressData.assignmentsSubmitted / progressData.totalAssignments) * 100);

  return (
    <div className="student-progress-card">
      <h3>Student Progress</h3>
      <div className="progress-section">
        <div className="progress-item">
          <CircularProgressbar 
            value={percentageLessons}
            text={`${percentageLessons}%`}
            styles={buildStyles({ pathColor: '#4caf50', textColor: '#4caf50' })}
          />
          <p>Lessons Completed</p>
        </div>
        <div className="progress-item">
          <CircularProgressbar 
            value={percentageAssignments} 
            text={`${percentageAssignments}%`}
            styles={buildStyles({ pathColor: '#2196f3', textColor: '#2196f3' })}
          />
          <p>Assignments Submitted</p>
        </div>
        {/* Add more sections for other metrics like average quiz score */}
      </div>
    </div>
  );
};

StudentProgressCard.propTypes = {
  studentId: PropTypes.number.isRequired
};

export default StudentProgressCard;
