import { Label } from 'semantic-ui-react'


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
            <div class="ui label">
            {tag_arr.map(t => <Label as='a' tag>{t}</Label>)}
            </div>
            <small>{start_date} | {location}</small>
            <p>{description}</p>
        </div>

    )
}

