import { useState, useEffect } from 'react'
import { useRegister } from '../../../hooks/useRegister'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditAccount = ({ editAccountID, refreshTable }) => {
    const [idNumber, setIdNumber] = useState('')
    const [password, setPassword] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [mname, setMname] = useState('')
    const [suffix, setSuffix] = useState('')
    const [level, setLevel] = useState('')
    const [track, setTrack] = useState('')
    const [strand, setStrand] = useState('')
    const [glvl, setGlvl] = useState('')
    const [section, setSection] = useState('')
    const {register, error, isLoading} = useRegister()

    const toast_accountCreated = () => {
        toast("Account Created")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        refreshTable();

        let databody = {
            "idNumber": idNumber,
            "password": password,
            "fname": fname,
            "lname": lname,
            "mname": mname,
            "suffix": suffix,
            "level": level,
            "track": track,
            "strand": strand,
            "glvl": glvl,
            "section": section
        }

        try {
        const res = await fetch(`http://localhost:5000/api/user/${editAccountID}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(databody),
        });
        const data = await res.json();
        console.log(data);
        } catch (err) {
        console.error(err);
        }

        refreshTable();
        root.style.setProperty('--adminModule_edit_modal-pointer-events', "none");
        root.style.setProperty('--adminModule_edit_modal-opacity', "0");
    }

    var root = document.querySelector(":root");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(`http://localhost:5000/api/user/${editAccountID}`);
            const data = await res.json();
                setIdNumber(data.idNumber);
                setPassword(data.password);
                setFname(data.fname);
                setLname(data.lname);
                setMname(data.mname);
                setSuffix(data.suffix);
                setLevel(data.level);
                setTrack(data.track);
                setStrand(data.strand);
                setGlvl(data.glvl);
                setSection(data.section);
          } catch (err) {
            console.error(err);
          }
        };
        fetchData();
    }, [editAccountID]);



    const clearForm = () => {
        setIdNumber('');
        setPassword('');
        setFname('');
        setLname('');
        setMname('');
        setSuffix('');
        setLevel('');
        setTrack('');
        setStrand('');
        setGlvl('');
        setSection('');
    }

    const cancelRegister = (e) => {
        e.preventDefault();
        clearForm()
        root.style.setProperty('--adminModule_edit_modal-pointer-events', "none");
        root.style.setProperty('--adminModule_edit_modal-opacity', "0");
    }

    return (
        <form className="adminModule_create_account_con" onSubmit={handleSubmit}>
            <div className="editAtt_Modal_label-b">Edit Account</div>

            <div className="adminModule_create_input_wrap">
                <div className="adminModule_create_input_inside">
                    <label className="adminModule_create_label">ID Number:</label>
                    <input 
                        type="text"
                        className="create_input"
                        onChange={(e) => setIdNumber(e.target.value)}
                        value={idNumber}
                    />
                </div>

                <div className="adminModule_create_input_inside">
                    <label className="adminModule_create_label">Password:</label>
                    <input 
                        type="password"
                        className="create_input"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div className="adminModule_create_input_inside">
                    <label className="adminModule_create_label">Level:</label>
                    <select
                        className="create_select"
                        value={level} 
                        onChange={(e) => setLevel(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                    </select>
                </div>
            </div>
            
            <div className="adminModule_create_input_wrap">
                <div className="adminModule_create_input_inside">
                    <label className="adminModule_create_label">First Name:</label>
                    <input 
                        type="text"
                        className="create_input-b"
                        onChange={(e) => setFname(e.target.value)}
                        value={fname}
                    />
                </div>

                <div className="adminModule_create_input_inside">
                    <label className="adminModule_create_label">Middle Name:</label>
                    <input 
                        type="text"
                        className="create_input-b"
                        onChange={(e) => setMname(e.target.value)}
                        value={mname}
                    />
                </div>

                <div className="adminModule_create_input_inside">
                    <label className="adminModule_create_label">Last Name:</label>
                    <input 
                        type="text"
                        className="create_input-b"
                        onChange={(e) => setLname(e.target.value)}
                        value={lname}
                    />
                </div>
                <div className="adminModule_create_input_inside">
                    <label className="adminModule_create_label">Suffix:</label>
                    <input 
                        type="text"
                        className="create_input-b"
                        onChange={(e) => setSuffix(e.target.value)}
                        value={suffix}
                    />
                </div>
            </div>

            <div className="adminModule_create_input_wrap">
                <div className="adminModule_create_input_inside">
                    <label className="adminModule_create_label">Track:</label>
                    <select
                        className="create_select"
                        value={track} 
                        onChange={(e) => setTrack(e.target.value)}>
                            <option value="admin">Admin</option>
                            <option value="Teacher">Teacher</option>
                            <option value="ACADEMIC">ACADEMIC</option>
                            <option value="TVL">TVL</option>
                    </select>
                </div>

                <div className="adminModule_create_input_inside">
                    <label className="adminModule_create_label">Strand:</label>
                    <select
                        className="create_select"
                        value={strand} 
                        onChange={(e) => setStrand(e.target.value)}>
                            <option value="admin">Admin</option>
                            <option value="Teacher">Teacher</option>
                            <option value="ABM">ABM</option>
                            <option value="HUMMS">HUMMS</option>
                            <option value="STEM">STEM</option>
                            <option value="TVL">TVL</option>
                    </select>
                </div>

                <div className="adminModule_create_input_inside">
                    <label className="adminModule_create_label">Grade Level:</label>
                    <select
                        className="create_select"
                        value={glvl} 
                        onChange={(e) => setGlvl(e.target.value)}>
                            <option value="admin">Admin</option>
                            <option value="Teacher">Teacher</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                    </select>
                </div>
                
                <div className="adminModule_create_input_inside">
                    <label className="adminModule_create_label">Section:</label>
                    <select
                        className="create_select"
                        value={section} 
                        onChange={(e) => setSection(e.target.value)}>
                            <option value="admin">Admin</option>
                            <option value="Teacher">Teacher</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                    </select>
                </div>
            </div>

            <button className="editAtt_cancel_button" onClick={cancelRegister}>Cancel</button>
            {/* <button disabled={isLoading} className="editAtt_update_button"> */}
            <button className="editAtt_update_button">
                Update
            </button>
            <div className="register_error_wrap">
                {error && <div className="register_error">{error}</div>}
            </div>
        </form>
    )
}

export default EditAccount