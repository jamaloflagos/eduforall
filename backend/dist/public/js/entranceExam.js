const radioButtons = document.querySelectorAll('input');
const errParagraph = document.querySelector('#err');
const examWindow = document.querySelector('#exam-window');
const successWindow = document.querySelector('#success-window');
const successText = document.querySelector('#success-text ');
const uncheckRadioBtn = document.querySelector('#clear-btn');
async function submitAnswers(email) {
    const studentAnswers = {
        email: email,
        answers: []
    };
  try {
    for (let i = 1; i <= 10; i++) {
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
    if (studentAnswers.answers.length < 10) throw new Error('Answer all question');
    const res = await fetch('http://localhost:4000/api/v1/entrance-exam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentAnswers)
    });

    if (!res.ok) throw new Error('Failed to submit answer, network response not ok.');

    if (res.ok) {
      const message = await res.text();
      examWindow.style.display = 'none';
      successWindow.style.display = 'block';
      successText.textContent = message;
    }
  } catch (err) {
    console.log(err.message);
    errParagraph.textContent = err.message === 'Failed to fetch' ? 'Failed to submit answer, Internal server erro' : err.message;
  }
}

// radioButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     uncheckRadioBtn.style.display = 'block';
//   })
// })