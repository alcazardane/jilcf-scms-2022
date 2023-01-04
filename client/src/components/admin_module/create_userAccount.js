import { useState } from 'react'
import { useRegister } from '../../hooks/useRegister'

const Register = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        await register(idNumber, password, fname, mname, lname, suffix, level, track, strand, section)
    }

    return (
        <form className='register' onSubmit={handleSubmit}>
            <h3>Create new Account</h3>

            <label>IDNumber:</label>
            <input 
                type="text"
                onChange={(e) => setIdNumber(e.target.value)}
                value={idNumber}
            />

            <label>Password:</label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            
            <label>First Name:</label>
            <input 
                type="text"
                onChange={(e) => setFname(e.target.value)}
                value={fname}
            />

            <label>Middle Name:</label>
            <input 
                type="text"
                onChange={(e) => setMname(e.target.value)}
                value={mname}
            />

            <label>Last Name:</label>
            <input 
                type="text"
                onChange={(e) => setLname(e.target.value)}
                value={lname}
            />

            <label>Suffix:</label>
            <input 
                type="text"
                onChange={(e) => setSuffix(e.target.value)}
                value={suffix}
            />

            <label>Level:</label>
            <input 
                type="text"
                onChange={(e) => setLevel(e.target.value)}
                value={level}
            />

            <label>Track:</label>
            <input 
                type="text"
                onChange={(e) => setTrack(e.target.value)}
                value={track}
            />

            <label>Strand:</label>
            <input 
                type="text"
                onChange={(e) => setStrand(e.target.value)}
                value={strand}
            />
            
            <label>section:</label>
            <input 
                type="text"
                onChange={(e) => setSection(e.target.value)}
                value={section}
            />

            <button disabled={isLoading}>Register</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Register