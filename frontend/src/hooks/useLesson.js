import { useContext } from "react";
import { LessonContext } from "../contexts/LessonContext";

export const useLesson = () => {
    const context = useContext(LessonContext);

    if(!context) {
        throw Error("Must be used within context")
    }

    return context;
} 