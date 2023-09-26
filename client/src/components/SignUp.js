import {useState} from 'react'

export default function SignUp({ setUser }) {
    const BLANK_FORM_DATA = {
        username: "",
        password: "",
        f_name: "",
        l_name: "",
    }

    const [formData, setFormData] = useState(BLANK_FORM_DATA)

    function onSignUp(user) {
        console.log("You've signed up!", user)
        setUser(user)
    }

    function handleSubmit(e) {
        console.log("Submitting...")
        e.preventDefault()

        console.log(formData)
        const POST_OPTIONS = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        fetch('/signup', POST_OPTIONS)
        .then(resp => {
            if (resp.status === 201) {
                return resp.json().then(data => onSignUp(data))
            } else {
                alert("That username is taken.")
            }
        })
        

        setFormData(BLANK_FORM_DATA)
    }

    return (
        <div>
            <h2>Sign Up</h2>
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
                <label htmlFor="f_name">First Name</label>
                <input 
                    type="text"
                    name="f_name"
                    value={formData.f_name}
                    onChange={(e) => setFormData({...formData, f_name: e.target.value})}
                />
                <label htmlFor="l_name">Last Name</label>
                <input 
                    type="text"
                    name="l_name"
                    value={formData.l_name}
                    onChange={(e) => setFormData({...formData, l_name: e.target.value})}
                />
                <input
                    type="submit"
                    value="Log In"
                />
            </form>

        </div>
    )
}