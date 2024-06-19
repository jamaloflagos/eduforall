import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LessonDetails from '../components/LessonDetails';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useLesson } from '../hooks/useLesson';

function Dashboard() {
    const [currentLesson, setCurrentLesson] = useState(null);
    const [message, setMessage] = useState(null);
    const { user, authTokens } = useAuth();
    const navigate = useNavigate();
    const { lessons, dispatch } = useLesson();

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
              dispatch({type: "FETCH_LESSONS", payload: lessons});
              if(lessons.length > 0) { // Check if there are lessons
                setCurrentLesson(lessons[0]); // Default to the first lesson
                navigate(`/dashboard/${lessons[0].id}`); // Navigate to the first lesson
              }
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
      }, [user, authTokens.accessToken, navigate])


    const handleLessonSelect = (lessonId) => {
        // Update the current lesson and navigate to its route
        setCurrentLesson(lessons.find(lesson => lesson.id === lessonId));
        navigate(`/dashboard/${lessonId}`);
    };

    return (
        <div className="dashboard">
            <Header />
            <div className="main-content">
                <Sidebar lessons={lessons} onLessonSelect={handleLessonSelect} />
                <div className="lesson-area">
                    {message && <h1>{message}</h1>}
                    <Routes>
                        {lessons.map(lesson => (
                            <Route
                                key={lesson.id}
                                path={`${lesson.id}`}
                                element={<LessonDetails currentLesson={currentLesson}/>}
                            />
                        ))}
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
