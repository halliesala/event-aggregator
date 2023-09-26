import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';


export default function LogoutPage() {

    const { setUser } = useOutletContext()
    setUser(null)

    useEffect(() => {
        fetch('/logout', {'method': 'DELETE'})
        .then(() => {
            console.log("Logout successful.")
        })
    }, [])

    return (
        <>
            <h2>You've been logged out.</h2>
        </>
    )
}