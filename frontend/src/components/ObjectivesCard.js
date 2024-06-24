import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const ObjectivesCard = ({lesson_id}) => {
    const { authTokens, user } = useAuth();
    const [objectives, setObjectives] = useState(null);
    const[message, setMessage] = useState();
    useEffect(() => {
        const fetchObjectives = async () => {
          try {
            const res = await fetch(`http://localhost:4000/api/v1/objectives/${lesson_id}`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.accessToken}`
              }
            });
      
            if (res.ok) {
              const { objectives } = res.json();
              setObjectives(objectives);
              return
            }
      
            const {message} = res.json();
            throw new Error(message);
          } catch (error) {
            setMessage(message);
          }
        }
      
        if (user) {
          fetchObjectives();
        }
       }, [lesson_id, user, authTokens.accessToken, message])

  return (
    <div>
        <h1>Objectives</h1>
        {message && <h1>{message}</h1>}
        <ul>
            {objectives.description.map(objective => (
                <li>
                    <h1>{objective}</h1>
                </li>
            ))}
        </ul>
    </div>
  )
}
export default ObjectivesCard