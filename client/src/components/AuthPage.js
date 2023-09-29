import SignIn from "./SignIn"
import SignUp from "./SignUp"
import { useOutletContext } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'

export default function AuthPage() {
    const context = useOutletContext()
    const { setUser } = context
    
    
    return (
        <>
            <Grid >
                <Grid.Column width={2} />
                <Grid.Column width={6}>
                    <SignIn setUser={setUser}/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <SignUp setUser={setUser}/>
                </Grid.Column>
                <Grid.Column width={2} />

            </Grid>
        </>
    )
}