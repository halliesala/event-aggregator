import SignIn from "./SignIn"
import SignUp from "./SignUp"
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export default function AuthPage() {
    const context = useOutletContext()
    const {user, setUser} = context
    const navigate = useNavigate()
    
    // If user: redirect to 'for you' page
    useEffect(() => {
        if (user) {
            navigate(`/my-events/${user.id}`)
        }
    }, [user, navigate])
    
    
    // If not user: show sign in, sign up
    return (
        <>
            <SignIn setUser={setUser}/>
            <SignUp setUser={setUser}/>
        </>
    )
}