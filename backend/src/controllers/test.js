const result = calculateScore(questions, selectedAnswers);
console.log(`Your score: ${result.score}/${result.totalQuestions}`);

result.questionFeedback.forEach(feedback => {
  console.log(feedback.question);
  console.log("Your answer was", feedback.correct ? "correct!" : "incorrect.");
  if (!feedback.correct) {
    console.log("The correct answer was option", feedback.correctAnswerIndex + 1); // Convert index to 1-based for display
  }
});
