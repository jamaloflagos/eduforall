import { useEffect, useState } from "react"
import Submissions from "./Submissions";
// import { Link } from "react-router-dom";

const Assignments = () => {
    const [message, setMessage] = useState();
    const [assignments, setAssignments] = useState();

    useEffect(() => {
      const fetchAssignments = async () => {
        try {
            const res = await fetch('https://eduforall.vercel.app/api/v1/assignments', {
                headers: {
                  'Content-Type': 'application/json',
                  'Role': 'tutor'
                }
              });

            if (res.status === 204) {
                setMessage('No assignments')
            }

            if (res.ok) {
                const data = await res.json();
                setAssignments(data.assignments);
                setMessage(null)
                return
            }

            const data = await res.json()
            throw new Error(data.message);
        } catch (err) {
            setMessage(err.message)
        }
      }

      fetchAssignments();
    }, [])


  return (
    <div>
        {message && <p>{message}</p>}
        <h3>Submitted Assignment Answers</h3>
        {assignments && assignments.map(assignment => (
            <div key={assignment.id}>
                <h4>{assignment.description}</h4>
                {/* <ul>
                    {submissions && submissions.map(submission => (
                        <p>{submission.firstname}</p>
                    ))}
                </ul> */}
                <Submissions assignment={assignment}/>
            </div>
        ))}
    </div>
  )
}
export default Assignments