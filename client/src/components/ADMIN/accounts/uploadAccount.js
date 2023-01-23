import React, { useState } from 'react';
import Papa from 'papaparse';
// import ClassSchedule from '../../../../../server/models/classScheduleModel'
// import ClassSchedule from './classScheduleModel';

const UploadAccount = ({ refreshTable }) => {
    var root = document.querySelector(":root");
    // let user = JSON.parse(localStorage.getItem('user'));
    // const token = user.token;

    const [file, setFile] = useState(null);
    const handleChange = (e) => {
        setFile(e.target.files[0]);
    }

    const cancelUpload = (e) => {
        e.preventDefault()
        root.style.setProperty('--Upload-Account-Modal-Admin-PointerEvents', "none");
        root.style.setProperty('--Upload-Account-Modal-Admin-Opacity', "0");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        refreshTable();
        if(file) {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    const data = results.data;
                    data.forEach(async (row) => {
                        try {
                            const response = await fetch('http://localhost:5000/api/user/register', {
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

        root.style.setProperty('--Upload-Account-Modal-Admin-PointerEvents', "none");
        root.style.setProperty('--Upload-Account-Modal-Admin-Opacity', "0");
        refreshTable();
    }

    return (
        <form className="editAtt_Modal_Container" onSubmit={handleSubmit}>
            <div className="upload_csv">
                <input className="upload_csv_btn" type="file" onChange={handleChange} accept=".csv" />
            </div>
            <button className="editAtt_cancel_button" onClick={cancelUpload}>Cancel</button>
            <button className="editAtt_update_button" onClick={handleSubmit}>Upload</button>
        </form>
    );
}

export default UploadAccount;