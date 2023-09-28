import {useState} from 'react'

export default function SignIn({ setUser }) {
    const BLANK_FORM_DATA = {
        username: "",
        password: "",
    }

    const [formData, setFormData] = useState(BLANK_FORM_DATA)

    function onLogin(user) {
        if (user) {
            setUser(user)
            console.log("You've logged in!", user)
            console.log(user)
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
                alert("Please try again or create a new account.")
            }
        })

        setFormData(BLANK_FORM_DATA)
    }

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <input
                    type="submit"
                    value="Log In"
                />
            </form>

        </div>
    )
}