import React, { useEffect, useState } from 'react';
import SubmissionItem from './SubmissionItem'; 
// import { useAuth } from '../hooks/useAuth';

const RecentSubmissionsList = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  // const { authTokens } = useAuth();

  useEffect(() => {
    const fetchSubmissions = async () => {
      setIsLoading(true);

      try {
        const res = await fetch('http://localhost:4000/api/v1/submissions', {
          headers: {
            'Content-Type': 'application/json',
            'Role': 'tutor'
            // 'Authorization': `Bearer ${authTokens.accessToken}`
          }
        });
        if (!res.ok) {
          const data = await res.json();
          setMessage(data.message);
        }
        const data = await res.json();
        setSubmissions(data.submissions);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (message) {
    return <div>Error: {message}</div>;
  }

  return (
    <div>
      <h3>Recent Submissions</h3>
      <ul>
        {submissions.map((submission) => (
          <SubmissionItem key={submission.id} submission={submission} />
        ))}
      </ul>
    </div>
  );
};

export default RecentSubmissionsList;
