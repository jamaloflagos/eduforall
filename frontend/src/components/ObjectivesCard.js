import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import '../styles/Objectives.css'

const ObjectivesCard = ({lesson_id}) => {
    const { authTokens, user } = useAuth();
    const [objectives, setObjectives] = useState(null);
    const[message, setMessage] = useState();
    useEffect(() => {
        const fetchObjectives = async () => {
          try {
            const res = await fetch(`https://eduforall-backend.vercel.app//api/v1/lessons/${lesson_id}/objectives`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.accessToken}`
              }
            });
      
            if (res.ok) {
              const data = await res.json();
              console.log(data.objectives)
              setObjectives(data.objectives);
              return
            }
      
            const data = res.json();
            throw new Error(data.message);
          } catch (error) {
            setMessage(message);
          }
        }
      
        if (user) {
          fetchObjectives();
        }
       }, [lesson_id]);

  return (
    <div className="objectives">
        <h3>Objectives</h3>
        {message && <h1>{message}</h1>}
        <ul>
            {objectives && objectives.map(objective => (
                <li>
                    <h6>{objective}</h6>
                </li>
            ))}
        </ul>
    </div>
  )
}
export default ObjectivesCard