import { Label } from 'semantic-ui-react'
import LikeButton from './LikeButton';


export default function EventCard({event}) {

    const {start_date, description, title, location, tags} = event
    const validJSON = tags.replace(/'/g, '"');
    let tag_arr
    try {
        tag_arr = JSON.parse(validJSON)
    } catch(e) {
        tag_arr = []
    }

    return (
        <div className="ui card">
            <h2>{title}</h2>
            <div className="ui label">
            {tag_arr.map((t, idx) => <Label key={idx} as='a' tag>{t}</Label>)}
            </div>
            <small>{start_date} | {location}</small>
            <p>{description}</p>
            <LikeButton event={event}/>
        </div>

    )
}

