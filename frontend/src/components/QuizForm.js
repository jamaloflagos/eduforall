// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// const QuizForm = ({ quiz, lesson_id }) => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState({}); // {questionId: answer}

//   const handleAnswerChange = (questionId, answer) => {
//     setUserAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: answer }));
//   };

//   const currentQuestion = quiz.questions[currentQuestionIndex];

//   const [submitted, setSubmitted] = useState(false);
//   const [quizResults, setQuizResults] = useState(null);

//   useEffect(() => {
//     // Check local storage for previous quiz results
//     const storedResults = JSON.parse(localStorage.getItem(`quizResults_${lesson_id}`));
//     if (storedResults) {
//       setSubmitted(true);
//       setQuizResults(storedResults);
//     }
//   }, [lesson_id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // const response = await axios.post(`https://eduforall-backend.vercel.app/api/quizzes/${quiz.id}/submit`, { answers: userAnswers });
//       // setSubmitted(true);
//       // setQuizResults(response.data);
//       // localStorage.setItem(`quizResults_${lesson_id}`, JSON.stringify(response.data));
//     } catch (err) {
//       // Handle error
//     }
//   };

//   const handleReset = () => {
//     setSubmitted(false);
//     setQuizResults(null);
//     setUserAnswers({}); // Reset user answers
//     localStorage.removeItem(`quizResults_${lesson_id}`);
//   };

//   return (
//     <div>
//       {submitted ? (
//         <>
//           <QuizResults quizResults={quizResults} />
//           <button onClick={handleReset}>Retake Quiz</button>
//         </>
//       ) : (
//       <form onSubmit={handleSubmit}>
//         <h3>{currentQuestion.questionText}</h3>
//         {/* Render answer choices (radio buttons, checkboxes, etc.) based on question type */}
//         <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>Next</button>
//         {currentQuestionIndex === quiz.questions.length - 1 && <button type="submit">Submit Quiz</button>}
//       </form>
//       )}
//     </div>
//   );
// };

// QuizForm.propTypes = {
//   quiz: PropTypes.shape({
//     questions: PropTypes.arrayOf(PropTypes.shape({
//       questionText: PropTypes.string.isRequired,
//       // ... other question properties
//     })).isRequired,
//   }).isRequired,
//   onSubmit: PropTypes.func.isRequired,
// };

// export default QuizForm;
