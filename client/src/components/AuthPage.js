import SignIn from "./SignIn"
import SignUp from "./SignUp"
import { useOutletContext } from 'react-router-dom';

export default function AuthPage() {
    const context = useOutletContext()
    if (context && 'user' in context && 'setUser' in context) {
        const {user, setUser} = context
        console.log(user)

        return (
            <>
                <SignIn setUser={setUser}/>
                <SignUp setUser={setUser}/>
            </>
        )
    } else {
        return (
            <>
                <SignIn />
                <SignUp />
            </>
        )
    }

}