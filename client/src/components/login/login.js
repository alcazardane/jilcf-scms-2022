import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import '../../styles/login.css'

/**
 * ! ERROR
 * ! Can't access the login form values
 * 
 * ? HOW IT SHOULD WORK
 * ? Must be able to get the user's input values and compare it to the records value
 * ? After a successful login, users will be redirected to their proper windows
 * ? After a successful login, users will be signed in.
 * ? When a signed in user attempted to access the login page, the user will be redirected back to the homepage
 */


export default function Login(){

    const [userRecord, setUserRecord] = useState(null)
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');

    // Fetching the data from the collection "records" in the database
    useEffect(() =>{
        const fetchUserRecord = async () => {
            const response = await fetch('http://localhost:5000/record')
            const json = await response.json()

            if (response.ok){
                setUserRecord(json)
            }
        }

        fetchUserRecord()
    }, [])

    const onFormSubmit = event  => {
        event.preventDefault();
        
        // if(first === userRecord.userID && last === userRecord.password){
        //     console.log("passed")
        //     setFirst('');
        //     setLast('');
        // }
        // else{
        //     console.log("failed")
        //     setFirst('');
        //     setLast('');
        // }
    }

    return(

        <div className="container">
            <img src="jilcf_logo_1.png" alt="JILCF Logo" />
            <form onSubmit={onFormSubmit} autoComplete="off">
                <div className="input-container">
                    <input
                        className="input_IDnumber" 
                        placeholder="ID Number" 
                        type="text" 
                        name="idnum"
                        value={first}
                        onChange={event => setFirst(event.target.value)} 
                        required 
                    />
                </div>
                
                <div className="input-container">
                    <input 
                        className="input_Password"
                        placeholder="Password" 
                        type="password" 
                        name="pass"
                        value={last}
                        onChange={event => setLast(event.target.value)} 
                        required 
                    />
                </div>
                <div className="button-container">
                    <small>
                        <a href="#">Forgot Your Password?</a>
                    </small>
                </div>
                <button type="submit" />
            </form>
        </div>

    )
}