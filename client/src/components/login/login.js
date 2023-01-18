// import axios from 'axios';
import { useState, useCallback, useEffect } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { useNavigate } from "react-router-dom"

import "../../styles/login.css"
import school_logo from "../../images/jilcf_logo_1.png"

const Login = () => {
    const [idNumber, setIdNumber] = useState("")
    const [password, setPassword] = useState("")
    const {login, error, isLoading} = useLogin()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(idNumber, password)

    }

    return (
        <div className="loginWrap">
        <form className='login' onSubmit={handleSubmit}>
            {/* <h3 className="loginLabelA">Login</h3> */}
            <div className="loginLabelA">
                <img className="login_schoolLogo" src={school_logo} alt="school logo"></img>
            </div>

            <div className="loginWrap loginconwrap">
            <label className="loginLabel">IDNumber:</label>
            <input 
                type="text"
                className="loginInput"
                onChange={(e) => setIdNumber(e.target.value)}
                value={idNumber}
            />
            </div>

            <div className="loginWrap loginconwrap">
            <label className="loginLabel">Password:</label>
            <input 
                type="password"
                className="loginInput"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            </div>

            <div className="loginWrap loginconwrap-button">
                <button className="loginbutton" disabled={isLoading}>Login</button>
                {error && <div className="error">{error}</div>}
            </div>
        </form>
        </div>
    )
}

export default Login