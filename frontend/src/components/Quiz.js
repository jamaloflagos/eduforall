import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import '../styles/Quiz.css'

function Quiz({lesson_id}) {
  const { user, authTokens } = useAuth();
  const [quizData, setQuizdata] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [message, setMessage] = useState(null);

  // Fetch quiz data and check for existing results
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`https://eduforall-backend.vercel.app//api/v1/quizzes/${lesson_id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.accessToken}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setQuizdata(data.quiz_data);
          setMessage(null);

          // Check for existing results in localStorage
          const storedResults = JSON.parse(localStorage.getItem(`quizResults_${lesson_id}`));
          if (storedResults && storedResults.studentId === user.id) {
            setSelectedAnswers(storedResults.answers);
            setShowResults(true);
          } else {
            setSelectedAnswers(new Array(data.quiz_data.length).fill(null));
            setShowResults(false);
          }
        } else {
          const data = await res.json();
          throw new Error(data.message);
        }
      } catch (error) {
        setMessage(error.message);
      }
    };
    
    if (user) {
      fetchQuiz();
    }
  }, [user, lesson_id, authTokens.accessToken]);
  
  // Save results on submit
  const handleSubmit = () => {
    setShowResults(true);
    const results = {studentId: user.id, answers: selectedAnswers};
    localStorage.setItem(`quizResults_${lesson_id}`, JSON.stringify(results));
  };

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setSelectedAnswers(prevAnswers => prevAnswers.map((answer, i) =>
      i === questionIndex ? selectedOption : answer
    ));
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers(new Array(quizData.length).fill(null)); 
    setShowResults(false);  
    localStorage.removeItem(`quizResults_${lesson_id}`)
  };
  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === quizData[index].answer ? score + 1 : score;
    }, 0);
  };

  return (
    <div className='quiz'>
      <h3>Quiz Time!</h3>
      { quizData.length > 0 ? (
      quizData.map((question, index) => (
        <div key={index} className='question'>
          <h3>{question.question}</h3>
          <div>
            {question.options && question.options.map((option, i) => (
              <div key={i} className='answer'>
                <label>
                  <input 
                    type="radio"
                    name={`question${index}`}
                    value={i}
                    checked={selectedAnswers[index] === i}
                    onChange={() => handleAnswerChange(index, i)}
                    disabled={showResults}
                  />
                  {option}
                </label>
                {showResults && selectedAnswers[index] === i && (
                  <span style={{ color: i === question.answer ? 'green' : 'red' }} className='show-result'>
                    {i === question.answer ? ' (Correct!)' : ' (Incorrect)'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )) ) : <h1>{message}</h1>
    }
     {!showResults && (
        <button onClick={handleSubmit} disabled={selectedAnswers.includes(null)}>
          Submit Answers
        </button>
      )}

      {showResults && (
        <>
          <button onClick={handleRetakeQuiz}>Retake Quiz</button>
          <p>Score: {calculateScore()}/{quizData.length}</p>
        </>
      )}
    </div>
  );
}

export default Quiz;
