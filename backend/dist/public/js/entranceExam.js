async function submitAnswers(email) {
    // Collect answers for each question
    // const answers = {};
    const errParagraph = document.querySelector('#err');
    const studentAnswers = {
        email: email,
        answers: []
    };
    // Collect answers for each question 
  try {
    for (let i = 1; i <= 20; i++) {
        const radioButtons = document.getElementsByName(i);
        let selectedAnswer = null;
        radioButtons.forEach(button => {
            if (button.checked) {
                selectedAnswer = button.value;
            }  
        });
        if (selectedAnswer !== null) {
            // answers[i] = selectedAnswer;
            const obj = {id: i, selectedAnswer: selectedAnswer};
            studentAnswers.answers.push(obj);
        } 
    }
    console.log(studentAnswers, email);
    if (studentAnswers.answers.length < 10) throw new Error('Answer all question');
    const res = await fetch('http://localhost:4000/api/v1/entrance-exam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentAnswers)
    });

    console.log(await res.text());
  } catch (err) {
    console.log(err.message);
    errParagraph.textContent = err.message;
  }
}