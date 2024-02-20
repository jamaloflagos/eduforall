const errParagraph = document.querySelector('#err');
const examWindow = document.querySelector('#exam-window');
const submitWindow = document.querySelector('#submit-window');
const submitText = document.querySelector('#submit-text ');
async function submitAnswers(email) {
    const studentAnswers = {
        email: email,
        answers: []
    };
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

    if (!res.ok) throw new Error('Failed to submit answer, network response not ok.');
    const data = await res.text();
    examWindow.style.display = 'none';
    submitWindow.style.display = 'block';
    submitText.textContent = data;
    console.log(await res.text());
  } catch (err) {
    console.log(err.message);
    errParagraph.textContent = err.message === 'Failed to fetch' ? 'Failed to submit answer, Internal server erro' : err.message;
  }
}