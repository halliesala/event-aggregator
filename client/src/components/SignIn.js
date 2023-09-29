import {useState} from 'react'
import { Form, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

export default function SignIn({ setUser }) {
    const BLANK_FORM_DATA = {
        username: "",
        password: "",
    }

    const [formData, setFormData] = useState(BLANK_FORM_DATA)
    const navigate = useNavigate()


    function onLogin(user) {
        if (user) {
            setUser(user)
            console.log("You've logged in!", user)
            console.log(user)
            navigate(`/my-events/${user.id}`)
        } else {
            console.log("Invalid user")
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log("Trying to log in...")

        const POST_OPTIONS = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        fetch('/login', POST_OPTIONS)
        .then(resp => {
            if (resp.status === 201) {
                return resp.json()
            } 
        })
        .then(user => {
            if (user) {
                onLogin(user)
            } else {
                // alert("Please try again or create a new account.")
                console.log("Please try again or create a new account.")
            }
        })

        // setFormData(BLANK_FORM_DATA)
    }

    function test_submit(e) {
        e.preventDefault()
        console.log("Form submitted")
    }

    return (
        <div>
            <h2>Sign In</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                </Form.Field>
                <Button type="submit">Log In</Button>
            </Form>

        </div>
    )
}