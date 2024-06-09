import { useState } from "react"
import Quiz from "./Quiz";

const Profile = () => {
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
            <li>What are all the data types available in JavaScript</li>
            <li>Scope of variables</li>
        </ul>
        <h3>Learning Resource Links</h3>
        <div>
            <span>Variable:</span> <a href="a">Learn Here</a>
        </div>
        <div>
            <span>Data Type:</span> <a href="a">Learn Here</a>
        </div>
        <Quiz />
        <h3>Assignment:: Write a code to add 2 numbers</h3>
        <form encType="multipart/form-data" onSubmit={handleUpload}>
            <label htmlFor="answer">Submit your answer:</label> <br />
            <input type="file" name="answer" id="answer" onChange={handleFileChange}/>
            <button type="submit">Submit Answer</button>
            {message && <h1>{message}</h1>}
        </form>
    </div>
  )
}
export default Profile