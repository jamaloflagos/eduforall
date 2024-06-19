import React, { useEffect, useState } from 'react';
import SubmissionItem from './SubmissionItem'; 

const RecentSubmissionsList = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('/api/submissions');
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
  }, []);

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
