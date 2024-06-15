import { useState } from "react";
import LessonContent from "../components/LessonContent";
// import QuizForm from "../components/QuizForm";
// import QuizResults from "../components/QuizResults";
import ObjectivesCard from "../components/ObjectivesCard";
import AssignmentCard from "../components/AssignmentCard";
import Quiz from "../components/Quiz";
const LessonDetailPage = ({ lesson }) => {
    // ... (fetch lesson and quiz data)
  
    // const [quizCompleted, setQuizCompleted] = useState(false); 
    // const [quizResults, lesson] = useState('a');
    const [assignment] = useState('a');
  
    // const handleQuizSubmit = (answers) => {
    //   // ... (Submit quiz answers logic)
    //   setQuizCompleted(true);
    // };
  
    return (
      <div>
        <ObjectivesCard lesson_id={lesson.id}/>
        <LessonContent content={lesson.content} />
        {/* {!quizCompleted ? (
          <QuizForm quiz={lesson.quiz} onSubmit={handleQuizSubmit} />
        ) : (
          <QuizResults quizResults={quizResults} />
        )} */}
        <Quiz lesson_id={lesson.id}/>
        <AssignmentCard key={assignment.id} assignment={assignment} />
      </div>
    );
  };
  
  export default LessonDetailPage;