import React, { useState } from 'react';
import Papa from 'papaparse';
// import ClassSchedule from '../../../../../server/models/classScheduleModel'
// import ClassSchedule from './classScheduleModel';

const CreateAccount = () => {
    var root = document.querySelector(":root");
    // let user = JSON.parse(localStorage.getItem('user'));
    // const token = user.token;

    const [file, setFile] = useState(null);
    const handleChange = (e) => {
        setFile(e.target.files[0]);
    }

    // const cancelUpload = () => {
    //     root.style.setProperty('--Upload-Sched-Modal-Admin-PointerEvents', "none");
    //     root.style.setProperty('--Upload-Sched-Modal-Admin-Opacity', "0");
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(file) {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    const data = results.data;
                    data.forEach(async (row) => {
                        try {
                            const response = await fetch('http://localhost:5000/api/accounts/create', {
                                method: 'POST',
                                headers: { 
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(row)
                            });
                            if (!response.ok) {
                                throw new Error(response.statusText);
                            }
                            else throw console.log('Successfully addedd')
                        } catch (error) {
                            console.error(error);
                        }
                    });
                }
            });
        }

        // root.style.setProperty('--Upload-Sched-Modal-Admin-PointerEvents', "none");
        // root.style.setProperty('--Upload-Sched-Modal-Admin-Opacity', "0");
    }

    return (
        <form className="editAtt_Modal_Container" onSubmit={handleSubmit}>
            <input type="file" onChange={handleChange} accept=".csv" />
            <button className="editAtt_update_button" onClick={handleSubmit}>Upload</button>
        </form>
    );
}

export default CreateAccount;