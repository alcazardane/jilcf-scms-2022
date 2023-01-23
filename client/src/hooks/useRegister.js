import { useState } from 'react'

export const useRegister = () => {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(null)
    const [isOk, setIsOk] = useState("")

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
            setIsOk("No")
        }
        else{
            setIsOk("Yes")
        }
    }

    return { register, isLoading, error, isOk}
}