import { useOutletContext } from "react-router-dom"

export default function LikeButton({ event }) {
    const {user, setUser} = useOutletContext()

    function handleClick() {
        if (!user) {
            alert("Login to save events.")
        } else {
            // Post to db
            // Show on page
            console.log("TODO: Add event to user's events list")
            console.log(event)
            console.log(user)
        }
    }

    return (
        <button onClick={handleClick}>Save</button>
    )
}