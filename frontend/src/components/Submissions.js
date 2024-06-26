import { useState, useEffect } from "react";

const Submissions = ({assignment}) => {
    const [message, setMessage] = useState();
    const [submissions, setSubmissions] = useState();
    useEffect(() => {
        const fetchSubmissions = async () => {
          // setIsLoading(true);
          console.log('get submissions called') 
          
          try {
            const res = await fetch(`http://localhost:4000/api/v1/submissions/${assignment.id}/assignment`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Role': 'tutor'
                }
              });
            if (res.status === 204) {
              setMessage('No submissions for this assignment');
              return
            }
  
          if (res.ok) {
              const data = await res.json();
              setSubmissions(data.submissions);
              setMessage(null)
              return
            }
  
          const data = await res.json()
          throw new Error(data.message);
          } catch (err) {
            setMessage(err.message);
          }
        };
  
        if (assignment){
            fetchSubmissions() 
        }
      }, [assignment])
  return (
    <div>
        <ul>
            {submissions && submissions.map(submission => (
                <li key={submission.id}>
                    <h5>{submission.firstname}</h5>
                </li>
            ))}
        </ul>
        {message && <p>{message}</p>}
    </div>
  )
}
export default Submissions