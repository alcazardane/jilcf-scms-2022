import React, { useState } from 'react';
import Papa from 'papaparse';

const CSVUploadAssessment = ({ refreshSchedTable }) => {
    var root = document.querySelector(":root");

    const [file, setFile] = useState(null);
    const handleChange = (e) => {
        setFile(e.target.files[0]);
    }

    const cancelUpload = (e) => {
        e.preventDefault();
        root.style.setProperty('--Upload-Assess-Modal-Admin-PointerEvents', "none");
        root.style.setProperty('--Upload-Assess-Modal-Admin-Opacity', "0");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // refreshSchedTable();

        if(file) {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    const data = results.data;
                    data.forEach(async (row) => {
                        let databody = {
                            "recordId": row.recordId,
                            "userId": row.userId,
                            "teacherId": row.teacherId,
                            "subjectId": row.subjectId,
                            "studRecord": [
                                {
                                    "date": row.date,
                                    "label": row.label,
                                    "score": row.score,
                                    "maxscore": row.maxscore
                                },
                                {
                                    "date": row.dateB,
                                    "label": row.labelB,
                                    "score": row.scoreB,
                                    "maxscore": row.maxscoreB
                                },
                                {
                                    "date": row.dateC,
                                    "label": row.labelC,
                                    "score": row.scoreC,
                                    "maxscore": row.maxscoreC
                                },
                                {
                                    "date": row.dateD,
                                    "label": row.labelD,
                                    "score": row.scoreD,
                                    "maxscore": row.maxscoreD
                                },
                                {
                                    "date": row.dateE,
                                    "label": row.labelE,
                                    "score": row.scoreE,
                                    "maxscore": row.maxscoreE
                                },
                                {
                                    "date": row.dateF,
                                    "label": row.labelF,
                                    "score": row.scoreF,
                                    "maxscore": row.maxscoreF
                                }                          
                            ]
                        }
                        console.log(databody);
                        try {
                            const response = await fetch('http://localhost:5000/api/assessment/upload', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(databody)
                            });
                            if (!response.ok) {
                                throw new Error(response.statusText);
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    });
                }
            });
        }

        root.style.setProperty('--Upload-Assess-Modal-Admin-PointerEvents', "none");
        root.style.setProperty('--Upload-Assess-Modal-Admin-Opacity', "0");
    }

    return (
        <form className="editAtt_Modal_Container" onSubmit={handleSubmit}>
            <input className="upload_csv" type="file" onChange={handleChange} accept=".csv" />
            <button className="editAtt_cancel_button" onClick={cancelUpload}>Cancel</button>
            <button className="editAtt_update_button" onClick={handleSubmit}>Upload</button>
        </form>
    );
}

export default CSVUploadAssessment;
