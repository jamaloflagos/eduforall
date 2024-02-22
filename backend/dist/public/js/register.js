const firstNameInput = document.querySelector('#first-name');
const middleNameInput = document.querySelector('#middle-name');
const lastNameInput = document.querySelector('#last-name');
const genderInput = document.querySelector('#gender');
const emailInput = document.querySelector('#email');
const dobInput = document.querySelector('#dob');
const errParagraph = document.querySelector('#err');
const formElement = document.querySelector('#form');
const successWindow = document.querySelector('#success-window');
const successText = document.querySelector('#success-text ');
formElement.addEventListener('submit', submitNewStudentData)
async function submitNewStudentData(e) {
    e.preventDefault();
    
    try {
        const newStudentData = {
            first_name: firstNameInput.value,
            middle_name: middleNameInput.value,
            last_name: lastNameInput.value,
            gender: genderInput.value,
            email: emailInput.value,
            DOB: dobInput.value
        };
        const res = await fetch('http://localhost:4000/api/v1/student/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStudentData)
        });
        console.log(res);
        if (!res.ok) {
            const error = await res.text();
            throw new Error(error);
        }

        if (res.ok) {
            const message = await res.text();
            formElement.style.display = 'none';
            successWindow.style.display = 'block';
            successText.textContent = message;
        }
    } catch (err) {
        errParagraph.textContent = err.message;
    }
}