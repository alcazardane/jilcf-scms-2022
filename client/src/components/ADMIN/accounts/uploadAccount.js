import React, { useState } from 'react';
import Papa from 'papaparse';
import { useRegister } from '../../../hooks/useRegister';

const UploadAccount = ({ refreshTable }) => {
    var root = document.querySelector(":root");
    const {register, error, isLoading} = useRegister()
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
                        e.preventDefault();

                        let idNumber = row.idNumber;
                        let password = row.password;
                        let fname = row.fname;
                        let mname = row.mname;
                        let lname = row.lname;
                        let suffix = row.suffix;
                        let level = row.level;
                        let track = row.track;
                        let strand = row.strand;
                        let glvl = row.glvl;
                        let section = row.section;
                        
                        await register(idNumber, password, fname, mname, lname, suffix, level, track, strand, glvl, section)
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