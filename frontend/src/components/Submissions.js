import { useState, useEffect } from "react";

const Submissions = ({assignment}) => {
    const [message, setMessage] = useState();
    const [submissions, setSubmissions] = useState();
    const [answer, setAnswer] = useState();

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

    const getSubmissionById = async (submission_id, student_id) => {
        try {
            const res = await fetch(`http://localhost:4000/api/v1/submissions/${submission_id}/student/${student_id}`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Role': 'tutor'
                }
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message);
            }

            const data = await res.text();
            setAnswer(data);
            console.log(data)
        } catch (err) {
            setMessage(err.message);
        }
    }
  return (
    <div>
        <ul>
            {submissions && submissions.map(submission => (
                <li key={submission.id}>
                    {/* <button onClick={() => getSubmissionById(submission.id, submission.student_id)}>{submission.firstname}</button> */}
                    <p>{submission.firstname}</p>
                </li>
            ))}
        </ul>
        {answer && <p>{answer}</p>}
        {message && <p>{message}</p>}
    </div>
  )
}
export default Submissions