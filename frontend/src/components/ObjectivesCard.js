import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const ObjectivesCard = ({lesson_id}) => {
    const { authTokens, user } = useAuth();
    const [objectives, setObjectives] = useState(null);
    const[message, setMessage] = useState();
    useEffect(() => {
        const fetchObjectives = async () => {
          try {
            const res = await fetch(`http://localhost:4000/api/v1/lessons/${lesson_id}/objectives`, {
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
    <div>
        <h1>Objectives</h1>
        {message && <h1>{message}</h1>}
        <ul>
            {objectives && objectives.map(objective => (
                <li>
                    <h1>{objective}</h1>
                </li>
            ))}
        </ul>
    </div>
  )
}
export default ObjectivesCard