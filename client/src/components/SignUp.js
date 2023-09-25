import {useState} from 'react'

export default function SignUp() {
    const BLANK_FORM_DATA = {
        username: "",
        password: "",
    }

    const [formData, setFormData] = useState(BLANK_FORM_DATA)

    function handleSubmit(e) {
        console.log("Submitting...")
        e.preventDefault()

        // TODO: Post login!
        console.log(formData)

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
                <input
                    type="submit"
                    value="Log In"
                />
            </form>

        </div>
    )
}