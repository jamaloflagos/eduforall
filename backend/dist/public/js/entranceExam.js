function submitAnswers(email) {
    // Collect answers for each question
    // const answers = {};
    const errParagraph = document.querySelector('#err');
    const data = {
        email: email,
        answers: []
    };
    // Collect answers for each question
  try {
    for (let i = 1; i <= 20; i++) {
        const radioButtons = document.getElementsByName(i);
        // console.log(radioButtons);
        let selectedAnswer = null;
        radioButtons.forEach(button => {
            // if (!button.checked) {
            //     break console.log('Answer all question')
            // }
            console.log(button.checked);
            if (button.checked) {
                console.log('question answered');
                selectedAnswer = button.value;
            }  

            // if(!button.checked) throw new Error('Answer all question');

        });
        if (selectedAnswer !== null) {
            // answers[i] = selectedAnswer;
            const obj = {id: i, selectedAnswer: selectedAnswer};
            data.answers.push(obj);
        } 
    }
    console.log(data, email);
    if (data.answers.length < 10) throw new Error('Answer all question');
  } catch (err) {
    console.log(err.message);
    errParagraph.textContent = err.message;
  }
    
    // Send answers to the server (you would customize this part)
    // fetch('/submit-answers', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(answers),
    // })
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    // })
    // .then(data => {
    //     console.log('Server response:', data);
    // })
    // .catch(error => {
    //     console.error('There was a problem submitting the answers:', error.message);
    // });
}