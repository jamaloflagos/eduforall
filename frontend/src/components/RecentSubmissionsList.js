import React, { useEffect, useState } from 'react';
import SubmissionItem from './SubmissionItem'; 
import { useAuth } from '../hooks/useAuth';

const RecentSubmissionsList = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authTokens } = useAuth();

  useEffect(() => {
    const fetchSubmissions = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost:4000/api/submissions', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.accessToken}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching submissions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, [authTokens.accessToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
