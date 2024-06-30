import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LessonDetails from '../components/LessonDetails';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useLesson } from '../hooks/useLesson';
import '../styles/Dashboard.css'

function Dashboard() {
    const [currentLesson, setCurrentLesson] = useState(null);
    const [message, setMessage] = useState(null);
    const { user, authTokens } = useAuth();
    const navigate = useNavigate();
    const { lessons, dispatch } = useLesson();

  useEffect(() => {
        const fetchLessons = async () => {
          try {
            const res = await fetch('https://eduforall.vercel.app/api/v1/lessons', {
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
                navigate(`/dashboard/week-${data.lessons[0].id}`); // Navigate to the first lesson
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
        navigate(`/dashboard/week-${lessonId}`);
    };


    return (
        <div className="dashboard">
            <Header />
            <div className="main-content">
                <Sidebar lessons={lessons} onLessonSelect={handleLessonSelect}/>
                <div className="lesson-area">
                    {message === 'Failed to fetch' ? <h4 className='message'>Oops! We're having trouble connecting to the server. Please try again later.</h4> : <h4 className='message'>{message}</h4>}
                    <Routes>
                        {lessons && lessons.map(lesson => (
                            <Route
                                key={lesson.id}
                                path={`/dashboard/week-${lesson.id}`}
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
