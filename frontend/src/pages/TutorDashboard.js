import React, { useState } from 'react';
import StudentProgressOverview from './StudentProgressOverview';
import RecentSubmissionsList from './RecentSubmissionsList';
import UpcomingDeadlines from './UpcomingDeadlines';
import CreateResourceModal from './CreateResourceModal'; // Reusable component

const TutorDashboard = () => {
  // ... (useState for any shared modal state)
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [createdResource, setCreatedResource] = useState(null);
  let lesson_id = null || createdResource.id || createdResource.lesson_id

  const onClose = () => {
    setShowModal(false);
    setCreatedResource(null); // Reset createdResource when closing
  };

  const onSubmit = (newResource) => {
    // Handle the newly created resource data here
    console.log('New resource created:', newResource); 
    setCreatedResource(newResource);
    // You might want to update the relevant section of the dashboard with this new resource
  };
  return (
    <div className="tutor-dashboard">
      <StudentProgressOverview />
      <RecentSubmissionsList />
      <UpcomingDeadlines />

      {/* Buttons to trigger modals */}
      <button onClick={() => setShowModal(true) & setModalType('lessons')}>Create Lesson</button>
      <button onClick={() => setShowModal(true) & setModalType('quizzes')}>Create Quiz</button>
      <button onClick={() => setShowModal(true) & setModalType('assignments')}>Create Assignment</button>

      {/* CreateResourceModal (conditionally rendered based on modal state) */}
      {showModal && <CreateResourceModal 
        resourceType={modalType} 
        onClose={onClose} 
        onSubmit={onSubmit}
        lesson_id={lesson_id} 
      />}

    {createdResource && (
        <div className="success-message">
          {createdResource.message} 
        </div>
      )}
    </div>
  );
};

export default TutorDashboard;
