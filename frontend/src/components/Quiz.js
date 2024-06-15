import React, { useState } from 'react';

function Quiz({quizData}) {
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(quizData.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setSelectedAnswers(prevAnswers => prevAnswers.map((answer, i) =>
      i === questionIndex ? selectedOption : answer
    ));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };
  const handleRetakeQuiz = () => {
    setSelectedAnswers(new Array(quizData.length).fill(null)); 
    setShowResults(false);                                   
  };
  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === quizData[index].answer ? score + 1 : score;
    }, 0);
  };

  return (
    <div>
      <h2>Quiz Time!</h2>
      {quizData.map((question, index) => (
        <div key={index}>
          <h3>{question.question}</h3>
          <div>
            {question.options.map((option, i) => (
              <div key={i}>
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
                  <span style={{ color: i === question.answer ? 'green' : 'red' }}>
                    {i === question.answer ? ' (Correct!)' : ' (Incorrect)'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
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
