import { Link } from 'react-router-dom';

const Sidebar = ({lessons, onLessonSelect}) => {
    console.log('sidebar')
    return (
        <ul>
            {lessons && lessons.map(lesson => (
                <li key={lesson.id} onClick={() => onLessonSelect(lesson.id)}>
                    <Link to={`${lesson.id}`}>{lesson.title}</Link>
                    {/* <h1>{lesson.title}</h1> */}
                </li>
            ))}
        </ul>
    );
}
export default Sidebar