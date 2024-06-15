import { useState } from "react";
import LessonCard from "../components/LessonCard";
const LessonListPage = () => {
    // ... (Fetching lesson data)
    const [lessons, setLessons] = useState();
    setLessons();
    return (
      <div className="lesson-list">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    );
  };
  
export default LessonListPage;