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
                    <input 
                        type="text"
                        className="create_input"
                        onChange={(e) => setTrack(e.target.value)}
                        value={track}
                    />
                </div>

                <div className="adminModule_create_input_inside">
                    <label className="adminModule_create_label">Strand:</label>
                    <input 
                        type="text"
                        className="create_input"
                        onChange={(e) => setStrand(e.target.value)}
                        value={strand}
                    />
                </div>
                
                <div className="adminModule_create_input_inside">
                    <label className="adminModule_create_label">Section:</label>
                    <input 
                        type="text"
                        className="create_input"
                        onChange={(e) => setSection(e.target.value)}
                        value={section}
                    />
                </div>
            </div>

            <button className="editAtt_cancel_button" onClick={cancelRegister}>Cancel</button>
            <button disabled={isLoading} className="editAtt_update_button">
                Create
            </button>
            <div className="register_error_wrap">
                {error && <div className="register_error">{error}</div>}
            </div>
        </form>
    )
}

export default EditAccount