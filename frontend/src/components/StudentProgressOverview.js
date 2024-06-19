import React, { useEffect, useState } from 'react';
import StudentProgressCard from './StudentProgressCard';

const StudentProgressOverview = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/students');

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []); 

  if (loading) {
    return <div>Loading...</div>; // Or a more elaborate loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="student-progress-overview">
      <h3>Student Progress Overview</h3>
      <div className="student-progress-list">
        {students.map(student => (
          <StudentProgressCard key={student.id} studentId={student.id} />
        ))}
      </div>
    </div>
  );
};

export default StudentProgressOverview;
