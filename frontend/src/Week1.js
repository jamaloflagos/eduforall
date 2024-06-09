import { useState } from "react"
import Quiz from "./Quiz";

const Week1 = () => {
    const [message, setMessage] = useState()
    // const submitAnswer = async(e) => {
    //     e.preventDefault()
    //     console.log('request sent')
    //     try {
    //         const res = await fetch('http://localhost:4000/api/upload', {
    //             method: 'POST',
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         })
    //         if (res.ok) {
    //             const data = await res.text()
    //             setMessage(data)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const quizData = [
        {
            question: "What is the difference between `var`, `let`, and `const` in JavaScript?",
            options: [
              "`var` is function-scoped, `let` and `const` are block-scoped.",
              "`let` and `const` are function-scoped, `var` is block-scoped.",
              "`var` can be reassigned and redeclared, `let` can be reassigned but not redeclared, `const` cannot be reassigned or redeclared.",
              "Both a) and c) are correct."
            ],
            answer: 3 // Index 3 for option d)
          },
          {
            question: "Which of the following is NOT a primitive data type in JavaScript?",
            options: ["Number", "String", "Boolean", "Object"],
            answer: 3 // Index 3 for option d)
          },
          {
            question: "In JavaScript, what does the `typeof` operator return for a variable that has been declared but not assigned a value?",
            options: ["undefined", "null", "NaN", "object"],
            answer: 0 // Index 0 for option a)
          },
          {
            question: "Which method is used to convert a string to a number in JavaScript?",
            options: ["parseInt()", "parseFloat()", "Number()", "All of the above"],
            answer: 3 // Index 3 for option d)
          },
          {
            question: "What is the difference between `null` and `undefined`?",
            options: [
              "`null` is an intentional absence of value, while `undefined` indicates a variable has been declared but not assigned a value.",
              "`null` is a primitive type, while `undefined` is an object.",
              "There is no difference; they are interchangeable.",
              "`null` can be used as an object, while `undefined` cannot."
            ],
            answer: 0 // Index 0 for option a)
          },
          {
            question: "What is the scope of a variable declared using the `var` keyword?",
            options: ["Global scope", "Function scope", "Block scope", "Lexical scope"],
            answer: 1 // Function scope
          },
          {
            question: "Which variable declaration type allows you to redeclare and reassign values?",
            options: ["var", "let", "const", "None of the above"],
            answer: 0 // var
          },
          {
            question: "Which variable declaration is best for declaring constants or values that should not be changed?",
            options: ["var", "let", "const", "All of the above"],
            answer: 2 // const
          },
          {
            question: "Which data type can store collections of data?",
            options: ["String", "Number", "Boolean", "Array"],
            answer: 3 // Index 3 for option d)
          }
      ];

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); 
    };

    const handleUpload = async (e) => {
        e.preventDefault()
        if (!selectedFile) {
            setMessage("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append('answer', selectedFile);
        try {
            const response = await fetch('http://localhost:4000/api/upload', { 
                method: 'POST',
                body: formData
            });

            const data = await response.text();
            setMessage(data); 
            setSelectedFile(null);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
  return (
    <div>
        <h1>Week 1</h1>
        <hr />
        <h3>Learning Objectives:</h3>
        <ul>
            <li>Why JavaScript programming is amazing</li>
            <li>How to run a JavaScript script</li>
            <li>How to create variables and constants</li>
            <li>How to assign values to variables</li>
            <li>Scopes of variable</li>
            <li>How to use JS console (console.log)</li>
            <li>What are all the data types available in JavaScript</li>
        </ul>
        <h3>Learning Resource Links</h3>
        <div>
            <span>How JS works:</span> <a href="https://docs.google.com/document/d/13vEclryVlDPmeycn8RjrCelI3BiLfLEzwdOIgb5ZcWs/edit?usp=sharing">Learn Here</a>
        </div>
        <div>
            <span>Variable:</span> <a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables">Learn Here</a>
        </div>
        <div>
            <span>Data Type:</span> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures">Learn Here</a>
        </div>
        <Quiz quizData={quizData}/>
        <h3>Assignment</h3>
        <h5>Create a JavaScript program that uses variables to store information about yourself and then displays it in the console.</h5>
        <h5>Your information should include name(string), age(number), hubbies(array), cgpa(number), been a student(boolean)</h5>
        <form encType="multipart/form-data" onSubmit={handleUpload}>
            <label htmlFor="answer">Submit your answer:</label> <br />
            <input type="file" name="answer" id="answer" onChange={handleFileChange}/>
            <button type="submit">Submit Answer</button>
            {message && <h1>{message}</h1>}
        </form>
    </div>
  )
}
export default Week1