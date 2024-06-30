import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { useAuth } from '../hooks/useAuth';

const CreateResourceModal = ({ resourceType, onClose, onSubmit, lesson_id}) => {
  const [title, setTitle] = useState('');
  // const [lesson_id , setLesson_id] = useState('');
  const [error, setError] = useState('');
  const [description, setDescription] = useState(''); // For lessons and quizzes
  // const [week, setWeek] = useState(''); // For lessons
  const [due_date, setDue_date] = useState(''); // For assignments
  const [objectives, setObjectives] = useState(['']); // Start with one empty objective
  const [selectedFile, setSelectedFile] = useState([]);
  // const { authTokens } = useAuth();
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], answer: null }, // Initial question
  ]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); 
};

  const addObjective = () => {
    setObjectives([...objectives, '']);
  };

  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    setObjectives(newObjectives);
    console.log(objectives)
  };

  const removeObjective = (index) => {
    const newObjectives = objectives.filter((_, i) => i !== index);
    setObjectives(newObjectives);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: null }]);
  };

  const handleQuestionChange = (index, field, value, optIndex) => {
    // const newQuestions = [...questions];
    // newQuestions[index][field] = value;
    // setQuestions(newQuestions);

    setQuestions(prevQuestions => prevQuestions.map((q, i) => {
      if (i === index) {
          if (field === 'options') {
              // Use spread operator to create a new array and add the new option
              const newOptions = [...q.options];
                if (optIndex !== undefined) { // Updating an existing option
                    newOptions[optIndex] = value;
                } else if (newOptions.length < 4) { // Adding a new option (only if less than 4)
                    newOptions.push(value);
                } 
                return { ...q, options: newOptions }
              // return { ...q, options: [...q.options, value] };
          }
          
          return { ...q, [field]: value }; 
          }
        
      return q;
  }));
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };
  console.log(title, objectives, selectedFile)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {};
    
    const formData = new FormData();
    
    if (resourceType === 'assignments') {
      // formData.append('due_date', due_date);
      // formData.append('description', description);
      // formData.append('lesson_id', lesson_id);
      data.due_date = due_date
      data.description = description
      data.lesson_id = lesson_id
      }
      
      if (resourceType === 'lessons') {
      formData.append('title', title);
      formData.append('lesson_content', selectedFile);
      formData.append('objectives', JSON.stringify(objectives));
    }
    
    if (resourceType === 'quizzes') {
      data.questions = questions
      data.lesson_id = lesson_id
    }
    
    try {
      console.log(data.description, data.lesson_id, data.due_date);
      console.log(formData.title)
      console.log(title, objectives, selectedFile)
      const res = await fetch(`https://eduforall-backend.vercel.app//api/v1/${resourceType}`, {
        method: 'POST',
        headers: resourceType === 'lessons' ? {'Role': 'tutor'} : {'Role': 'tutor',
          'Content-Type': 'application/json'
        },
        body: resourceType === 'lessons' ? formData : JSON.stringify(data)
      });
      if (res.ok) {
        const newResource = await res.json(); 
        // console.log(newResource);
        // setLesson_id(newResource.lesson_id)
        onSubmit(newResource); // Notify parent component of success
        onClose(); // Close the modal
      } else {
        // Handle errors, e.g., display an error message to the user
      }
    } catch (err) {
      setError(err.message)
      console.error('Error creating resource:', error);
      // Handle errors, e.g., display an error message to the user
    }
  };

  console.log(lesson_id);

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        
        {resourceType === 'lessons' && (
          <div>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title'/>
            {/* <input type="text" value={week} onChange={(e) => setWeek(e.target.value)} placeholder='Week'/> */}
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
            <input type="file" onChange={handleFileChange} name="lesson_content"/>

            {/* <ul>
                {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
                ))}
            </ul> */}
          </div>
        )}   

{resourceType === 'quizzes' && (
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
                {Array.isArray(question.options) && question.options.map((option, optIndex) => (
                  <div key={optIndex}>
                    <input
                      type="text"
                      placeholder={`Option ${optIndex + 1}`}
                      value={option}
                      onChange={(e) => handleQuestionChange(index, 'options', e.target.value, optIndex)}
                    />
                  </div>
                ))}
                <select
                  value={question.answer || ''}
                  onChange={(e) => handleQuestionChange(index, 'answer', parseInt(e.target.value))}
                >
                  <option value="">Select Correct Answer</option>
                  {question.options.map((_, optIndex) => (
                    <option key={optIndex} value={optIndex}>{optIndex}</option>
                  ))}
                </select>
                <button type="button" onClick={() => removeQuestion(index)}>-</button>
              </div>
            ))}
            <button type="button" onClick={addQuestion}>Add Question</button>
          </div>
        )}

        { resourceType === 'assignments' && (
            <div>
                <h4>Assignment</h4>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="date" value={due_date} onChange={(e) => setDue_date(e.target.value)} />
            </div>
        )}
        {error && <h1>{error}</h1>}
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
  // lesson_id: PropTypes.number.isRequired,
};

export default CreateResourceModal;
