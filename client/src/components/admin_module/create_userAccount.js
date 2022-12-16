import { useState } from 'react'
import { useRegister } from '../../hooks/useRegister'

const Register = () => {
    const [idNumber, setIdNumber] = useState('')
    const [password, setPassword] = useState('')
    const {register, error, isLoading} = useRegister()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await register(idNumber, password)
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

            <button disabled={isLoading}>Register</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Register