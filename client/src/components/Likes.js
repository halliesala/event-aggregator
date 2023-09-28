import { useState } from 'react'
import LikeButton from './LikeButton';


export default function Likes({ event, bottomStyle }) {

    const [userFavorites, setUserFavorites] = useState(
        event.user_events.map(ue => ue?.user?.username)
    )

    let howManySavesP = <p>No users have saved this event</p>
    
    
    switch (userFavorites.length) {
        case 0: 
            break;
        case 1:
            //console.log(1);
            howManySavesP = <p>{userFavorites[0]} has saved this event</p>
            break;
        case 2:
            //console.log(2)
            howManySavesP = <p>{userFavorites[0]} and {userFavorites[1]} have saved this event</p>
            break;
        case 3:
            //console.log(3)
            howManySavesP = <p>{userFavorites[0]}, {userFavorites[1]}, and {userFavorites[2]} have saved this event</p>
            break;
        default:
            //console.log("More than 3")
            howManySavesP = <p>{userFavorites[0]}, {userFavorites[1]}, and {userFavorites.length - 2} others have saved this event</p>
    }
        

    return (
        <>
            <LikeButton event={event} />
            {
                howManySavesP
            }
        </>
    )
}