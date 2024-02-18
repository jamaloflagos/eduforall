function submitAnswers(email) {
    // Collect answers for each question
    // const answers = {};
    const data = {
        email: email,
        answers: []
    };
    let allQuestionsAnswered = true;
    // Collect answers for each question
    for (let i = 1; i <= 20; i++) {
        const radioButtons = document.getElementsByName(i);
        let selectedAnswer = null;
        let buttonChecked = false;
        radioButtons.forEach(button => {
            // if (!button.checked) {
            //     break console.log('Answer all question')
            // }
            if (button.checked) {
                console.log('question answered');
                selectedAnswer = button.value;
                buttonChecked = true;
            } 

            if (!button.checked) {
                console.log('Answer all question');
            }
        });
        if (selectedAnswer !== null) {
            // answers[i] = selectedAnswer;
            console.log('answer not null');
            const obj = {id: i, selectedAnswer: selectedAnswer};
            data.answers.push(obj);
        } else {
            console.log('answer is null');
            allQuestionsAnswered = false;
        }
    }

    if (allQuestionsAnswered) {
        console.log(data, email);
    } else {
        console.log('Answer all questions');
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