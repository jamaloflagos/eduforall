import { Link } from 'react-router-dom';

const Sidebar = ({lessons, onLessonSelect}) => {
    return (
        <ul>
            {lessons && lessons.map(lesson => (
                <li key={lesson.id} onClick={() => onLessonSelect(lesson.id)}>
                    <Link to={`week-${lesson.id}`}>Week {lesson.week}</Link>
                    {/* <h1>{lesson.title}</h1> */}
                </li>
            ))}
        </ul>
    );
}
export default Sidebar