import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({lessons, onLessonSelect}) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => setIsOpen(!isOpen);
    return (
        <>
           {/* Hamburger Menu (only shown when sidebar is closed) */}
           {!isOpen && (
                        <button className="hamburger-menu" onClick={toggleSidebar} aria-label="Open Sidebar">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                )}
            <div className={`sidebar ${isOpen ? '' : 'closed'}`}>
                    {/* Close Button (only shown when sidebar is open) */}
                    {isOpen && (
                        <button className="close-button" onClick={toggleSidebar}>
                        &times; {/* Unicode multiplication symbol for an "X" */}
                        </button>
                    )}
                    <ul>
                    {lessons && lessons.map(lesson => (
                        <li key={lesson.id} onClick={() => onLessonSelect(lesson.id)}>
                            <Link to={`week-${lesson.id}`}>Week {lesson.week}</Link>
                        </li>
                    ))}
                    </ul>
            </div>
        </>
    );
}
export default Sidebar