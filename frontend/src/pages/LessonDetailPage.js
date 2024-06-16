import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LessonContent from "../components/LessonContent";
// import QuizForm from "../components/QuizForm";
// import QuizResults from "../components/QuizResults";
import ObjectivesCard from "../components/ObjectivesCard";
import AssignmentCard from "../components/AssignmentCard";
import Quiz from "../components/Quiz";
import { useAuth } from "../hooks/useAuth";

const LessonDetailPage = ({ lesson }) => {
  const { authTokens, user } = useAuth();
  const { id } = useParams();
  const [lessonContent, setLessonContent] = useState();
  const [message, setMessage] = useState();
    // ... (fetch lesson and quiz data)
  useEffect(()=> {
    const fetchLessonDetail = async () => {
      try {
        const res = await fetch (`/api/v1/lessons/${id}`, {
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
  }, [user, authTokens.accessToken,id])
  
  return (
      <div>
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
  
  export default LessonDetailPage;