import { useOutletContext } from "react-router-dom"

export default function LikeButton({ event }) {
    const {user, setUser} = useOutletContext()

    function handleClick() {
        if (!user) {
            alert("Login to save events.")
        } else {
            // Post to db
            const POST_OPTIONS = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user.id,
                    event_id: event.id,
                })
            }
            fetch('/user-events', POST_OPTIONS)
            .then(resp => resp.json())
            .then(data => console.log("Post data:", data))
            // Show on page
            // console.log("TODO: Add event to user's events list")
            // console.log(event)
            // console.log(user)
        }
    }

    return (
        <button onClick={handleClick}>Save</button>
    )
}