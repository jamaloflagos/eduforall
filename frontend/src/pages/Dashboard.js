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
      console.log('dashboard');
        const fetchLessons = async () => {
          try {
            const res = await fetch('http://localhost:4000/api/v1/lessons', {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.accessToken}`
              }
            })
      
            if (res.ok && res.status === 200) {
              const data = await res.json();
              dispatch({type: "FETCH_LESSONS", payload: data.lessons});
              if(data.lessons.length > 0) { // Check if there are data.lessons
                setCurrentLesson(data.lessons[0]); // Default to the first lesson
                navigate(`/dashboard/${data.lessons[0].id}`); // Navigate to the first lesson
              }
              return
            }
      
            if (res.ok) {
              const data = await res.json();
              setMessage(data.message);
              return
            }
      
            if (!res.ok || res.status === 204) {
              const data = await res.json();
              throw new Error(data.message);
            }
          } catch (err) {
            setMessage(err.message);
          }
        }
    
        if (user) {
            fetchLessons();
        }
      }, [])


    const handleLessonSelect = (lessonId) => {
        // Update the current lesson and navigate to its route
        setCurrentLesson(lessons.find(lesson => lesson.id === lessonId));
        navigate(`/dashboard/${lessonId}`);
    };

    console.log(message)

    return (
        <div className="dashboard">
            <Header />
            <div className="main-content">
                <Sidebar lessons={lessons} onLessonSelect={handleLessonSelect} />
                <div className="lesson-area">
                    {message && <h1>{message}</h1>}
                    <Routes>
                        {lessons && lessons.map(lesson => (
                            <Route
                                key={lesson.id}
                                path={`/dashboard/${lesson.id}`}
                                element={<LessonDetails currentLesson={currentLesson}/>}
                            />
                        ))}
                    </Routes>
                </div>
                {lessons && lessons.map(lesson => (
                  <h1>{lesson.title}</h1>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
