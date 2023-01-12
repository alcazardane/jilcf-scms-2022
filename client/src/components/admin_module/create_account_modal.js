import { useState } from 'react'
import { useRegister } from '../../hooks/useRegister'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CreateAccountModal = () => {

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
        e.preventDefault()

        await register(idNumber, password, fname, mname, lname, suffix, level, track, strand, section)
    }

    var root = document.querySelector(":root");

    // const cancelCreate = () => {
    //     root.style.setProperty('--adminModule_create_modal-pointer-events', "none");
    //     root.style.setProperty('--adminModule_create_modal-opacity', "0");

    //     resetInputs();
    // }

    const cancelRegister = () => {
        root.style.setProperty('--adminModule_create_modal-pointer-events', "none");
        root.style.setProperty('--adminModule_create_modal-opacity', "0");
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

    return (
        <form className="adminModule_create_account_con" onSubmit={handleSubmit}>
            <h3>Create new Account</h3>

            <div className="adminModule_create_input_wrap">
                <div className="adminModule_create_input_inside-c">
                    <label className="adminModule_create_label">ID Number:</label>
                    <input 
                        type="text"
                        className="create_input"
                        onChange={(e) => setIdNumber(e.target.value)}
                        value={idNumber}
                    />
                </div>

                <div className="adminModule_create_input_inside-c">
                    <label className="adminModule_create_label">Password:</label>
                    <input 
                        type="password"
                        className="create_input"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
            </div>
            
            <div className="adminModule_create_input_wrap">
                <div className="adminModule_create_input_inside">
                    <label className="adminModule_create_label">First Name:</label>
                    <input 
                        type="text"
                        className="create_input"
                        onChange={(e) => setFname(e.target.value)}
                        value={fname}
                    />
                </div>

                <div className="adminModule_create_input_inside">
                    <label className="adminModule_create_label">Middle Name:</label>
                    <input 
                        type="text"
                        className="create_input"
                        onChange={(e) => setMname(e.target.value)}
                        value={mname}
                    />
                </div>

                <div className="adminModule_create_input_inside">
                    <label className="adminModule_create_label">Last Name:</label>
                    <input 
                        type="text"
                        className="create_input"
                        onChange={(e) => setLname(e.target.value)}
                        value={lname}
                    />
                </div>
            </div>

            <div className="adminModule_create_input_wrap">
                <div className="adminModule_create_input_inside-c">
                    <label className="adminModule_create_label">Suffix:</label>
                    <input 
                        type="text"
                        className="create_input"
                        onChange={(e) => setSuffix(e.target.value)}
                        value={suffix}
                    />
                </div>

                <div className="adminModule_create_input_inside-c">
                    <label className="adminModule_create_label">Level:</label>
                    <input 
                        type="text"
                        className="create_input"
                        onChange={(e) => setLevel(e.target.value)}
                        value={level}
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
            
        </form>
    )
}

export default CreateAccountModal