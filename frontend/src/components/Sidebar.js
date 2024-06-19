import { Link } from 'react-router-dom';

const Sidebar = ({lessons, onLessonSelect}) => {
    return (
        <ul>
            {lessons.map(lesson => (
                <li key={lesson.id} onClick={() => onLessonSelect(lesson.id)}>
                    <Link to={`${lesson.id}`}>{lesson.title}</Link>
                </li>
            ))}
        </ul>
    );
}
export default Sidebar