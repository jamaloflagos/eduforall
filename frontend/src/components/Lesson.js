import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import LessonCard from "./LessonCard";
const SideBar = () => {
    // ... (Fetching lesson data)
    const { authTokens, user } = useAuth()
    const [lessons, setLessons] = useState();
    const [message, setMessage] = useState();
    useEffect(() => {
      const fetchLessons = async () => {
        try {
          const res = await fetch('/api/v1/lessons', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authTokens.accessToken}`
            }
          })
    
          if (res.ok && res.status === 200) {
            const { lessons } = await res.json();
            setLessons(lessons);
            return
          }
    
          if (res.ok && res.status === 204) {
            const { message } = await res.json();
            setMessage(message);
            return
          }
    
          const { message } = await res.json();
          throw new Error(message);
        } catch (error) {
          setMessage(error.message);
        }
      }
  
      if (user) {
          fetchLessons();
      }
    }, [user, authTokens.accessToken])
    
    return (
      <div className="lesson-list">
        <h1>Lessons</h1>
        {lessons ? (
          lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))
      ) : <h3>{message}</h3>}
      </div>
    );
  };
  
export default SideBar;