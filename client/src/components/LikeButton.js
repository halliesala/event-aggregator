import { useOutletContext } from "react-router-dom"
import { Button } from 'semantic-ui-react';

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
        }
    }

    return (
        <Button onClick={handleClick}>Save</Button>
    )
}