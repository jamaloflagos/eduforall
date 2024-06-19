import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CreateResourceModal = ({ resourceType, onClose, onSubmit, lesson_id }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); // For lessons and quizzes
  const [week, setWeek] = useState(''); // For lessons
  const [due_date, setDue_date] = useState(''); // For assignments
  const [lessonId, setLessonId] = useState(''); // For quizzes and assignments
  const [objectives, setObjectives] = useState(['']); // Start with one empty objective
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], answer: null }, // Initial question
  ]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).slice(0, 3); // Limit to 3 files
    setSelectedFiles(files);
  };

  const addObjective = () => {
    setObjectives([...objectives, '']);
  };

  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    setObjectives(newObjectives);
  };

  const removeObjective = (index) => {
    const newObjectives = objectives.filter((_, i) => i !== index);
    setObjectives(newObjectives);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: null }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      week,
      objectives: objectives.filter(obj => obj.trim() !== ''),
      due_date,
      description,
      questions,
      lesson_id // For quizzes and assignments
    };

    selectedFiles.forEach(file => {
        formData.append('lesson_content', file); // 'files' matches your backend field name
      });

    // Filter out null or empty values
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v !== null && v !== '')
    );

    try {
      const response = await fetch(`/api/${resourceType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
        },
        body: JSON.stringify(filteredData),
      });

      if (response.ok) {
        const newResource = await response.json();
        onSubmit(newResource); // Notify parent component of success
        onClose(); // Close the modal
      } else {
        // Handle errors, e.g., display an error message to the user
      }
    } catch (error) {
      console.error('Error creating resource:', error);
      // Handle errors, e.g., display an error message to the user
    }
  };

  // ... (Form fields based on resourceType - you'll need to customize this)

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        {/* ... form fields for title, content, week, dueDate, etc. ... */}
        
        {resourceType === 'lesson' && (
          <div>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" value={week} onChange={(e) => setWeek(e.target.value)} />
            <h4>Objectives:</h4>
            {objectives.map((objective, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={objective}
                  onChange={(e) => handleObjectiveChange(index, e.target.value)}
                />
                <button type="button" onClick={() => removeObjective(index)}>-</button>
              </div>
            ))}
            <button type="button" onClick={addObjective}>Add Objective</button>
            <input type="file" multiple onChange={handleFileChange} />

            <ul>
                {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
                ))}
            </ul>
          </div>
        )}   

{resourceType === 'quiz' && (
          <div>
            <h4>Questions:</h4>
            {questions.map((question, index) => (
              <div key={index} className="question-group">
                <input
                  type="text"
                  placeholder="Question"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                />
                {question.options.map((option, optIndex) => (
                  <div key={optIndex}>
                    <input
                      type="text"
                      placeholder={`Option ${optIndex + 1}`}
                      value={option}
                      onChange={(e) => handleQuestionChange(index, 'options', optIndex, e.target.value)}
                    />
                  </div>
                ))}
                <select
                  value={question.answer || ''}
                  onChange={(e) => handleQuestionChange(index, 'answer', parseInt(e.target.value))}
                >
                  <option value="">Select Correct Answer</option>
                  {question.options.map((_, optIndex) => (
                    <option key={optIndex} value={optIndex}>{optIndex + 1}</option>
                  ))}
                </select>
                <button type="button" onClick={() => removeQuestion(index)}>-</button>
              </div>
            ))}
            <button type="button" onClick={addQuestion}>Add Question</button>
          </div>
        )}

        { resourceType === 'assignmnets' && (
            <div>
                <h4>Assignment</h4>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="date" value={due_date} onChange={(e) => setDescription(e.target.value)} />
            </div>
        )}
        <button type="submit">Create</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

CreateResourceModal.propTypes = {
  resourceType: PropTypes.oneOf(['lessons', 'quizzes', 'assignments']).isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  lesson_id: PropTypes.number.isRequired,
};

export default CreateResourceModal;
