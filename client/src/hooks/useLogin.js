import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from "react-router-dom"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const login = async (idNumber, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin" : "*", 
                "Access-Control-Allow-Credentials" : true 
            },
            body: JSON.stringify({idNumber, password})
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok){
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            const cred = JSON.parse(localStorage.getItem('user'))
            
            if(cred.level === "1"){
                navigate("/home/L1/user_dashboard")
            }
            else if(cred.level === "2"){
                navigate("/home/L2/user_dashboard")
            }
            else if(cred.level === "3"){
                navigate("/home/L3/user_dashboard")
            }

            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}