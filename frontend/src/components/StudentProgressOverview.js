import React, { useEffect, useState } from 'react';
import StudentProgressCard from './StudentProgressCard';
// import { useAuth } from '../hooks/useAuth';

const StudentProgressOverview = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  // const { authTokens } = useAuth();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/v1/students', {
          headers: {
            'Content-Type': 'application/json',
            'Role': 'tutor'
            // 'Authorization': `Bearer ${authTokens.accessToken}`
          }
        });

        if (!res.ok) {
          const data = await res.json();
          setMessage(data.message)
        }

        const data = await res.json();
        setStudents(data.students);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    // fetchStudents();
  }, []); 

  if (loading) {
    return <div>Loading...</div>; // Or a more elaborate loading indicator
  }

  if (message) {
    return <div>message: {message}</div>; 
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
