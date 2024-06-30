import { useEffect, useState } from "react";
import LessonContent from "./LessonContent";
import ObjectivesCard from "./ObjectivesCard";
import AssignmentCard from "./AssignmentCard";
import Quiz from "./Quiz";
import { useAuth } from "../hooks/useAuth";

const LessonDetails = ({ currentLesson }) => {
  console.log('lesson details')
  
  const { authTokens, user } = useAuth();
  const { id, title } = currentLesson;
  console.log(id, currentLesson, "in lesson detail")
  const [lessonContent, setLessonContent] = useState();
  const [message, setMessage] = useState();
  
  useEffect(()=> {
    const fetchLessonDetail = async () => {
      try {
        const res = await fetch (`https://eduforall-backend.vercel.app//api/v1/lessons/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.accessToken}`
          }
        });
  
        if (res.ok) {
          const content = await res.text();
          setLessonContent(content);
          return
        }
  
        if (!res.ok && res.status === 404) {
          const data = await res.json();
          setMessage(data.message);
          return
        }

        const data = await res.json();
        throw new Error(data.message);
  
      } catch (err) {
        setMessage(err.message);
      }
    }
    
    if (user) {
      fetchLessonDetail()
    }
  }, [user, authTokens.accessToken, id])

  
  return (
      <div>
        {title && <h1 style={{paddingLeft: '10px'}}>{title}</h1>}
        <ObjectivesCard lesson_id={id}/>
        {message ? <h1>{message}</h1> : <LessonContent content={lessonContent} />}
        {/* {!quizCompleted ? (
          <QuizForm quiz={lesson.quiz} onSubmit={handleQuizSubmit} />
        ) : (
          <QuizResults quizResults={quizResults} />
        )} */}
        <Quiz lesson_id={id}/>
        <AssignmentCard  lesson_id={id} />
      </div>
    );
  };
  
  export default LessonDetails;