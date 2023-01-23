import { useState } from 'react'

export const useRegister = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const register = async (idNumber, password, fname, mname, lname, suffix, level, track, strand, glvl, section) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:5000/api/user/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({idNumber, password, fname, mname, lname, suffix, level, track, strand, glvl, section})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
    }

    return { register, isLoading, error }
}