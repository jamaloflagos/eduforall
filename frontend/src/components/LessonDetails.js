import { useEffect, useState } from "react";
import LessonContent from "./LessonContent";
import ObjectivesCard from "./ObjectivesCard";
import AssignmentCard from "./AssignmentCard";
import Quiz from "./Quiz";
import { useAuth } from "../hooks/useAuth";

const LessonDetails = ({ currentLesson }) => {
  const { authTokens, user } = useAuth();
  const { lesson_id } = currentLesson;
  const [lessonContent, setLessonContent] = useState();
  const [message, setMessage] = useState();
  
  useEffect(()=> {
    const fetchLessonDetail = async () => {
      try {
        const res = await fetch (`http://localhost:4000/api/v1/lessons/${lesson_id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.accessToken}`
          }
        });
  
        if (res.ok) {
          const content = res.text();
          setLessonContent(content);
          return
        }
  
        if (!res.ok && res.status === 404) {
          const {message} = await res.json();
          setMessage(message);
          return
        }
        
        const {message} = res.json();
        throw new Error(message);
  
      } catch (error) {
        setMessage(error.message);
      }
    }
    
    if (user) {
      fetchLessonDetail()
    }
  }, [user, authTokens.accessToken, lesson_id])
  
  return (
      <div>
        <ObjectivesCard lesson_id={lesson_id}/>
        {message ? <h1>{message}</h1> : <LessonContent content={lessonContent} />}
        {/* {!quizCompleted ? (
          <QuizForm quiz={lesson.quiz} onSubmit={handleQuizSubmit} />
        ) : (
          <QuizResults quizResults={quizResults} />
        )} */}
        <Quiz lesson_id={lesson_id}/>
        <AssignmentCard  lesson_id={lesson_id} />
      </div>
    );
  };
  
  export default LessonDetails;