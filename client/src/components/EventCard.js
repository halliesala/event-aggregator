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

    const cardStyle = {
        position: 'relative',
        width: '400px', 
        height: '500px'
    };
    const imgStyle = {
        width:'100%',
        height:'100%',
        objectFit:'cover',
        overflow: 'hidden',
        objectPosition:'center'
    }
    const bottomStyle = {
        position: 'absolute',
        bottom: 0
    }
    const imgContainer = {
        width: '200px',
        height: '300px',
        overflow: 'hidden',
        position: 'relative',
        objectPosition:'center'
    }

    return (
        <div className="ui card" style={cardStyle}>
            <div style={imgContainer}>
            <img style={imgStyle} src={event.img_link}></img>
            </div>
            <h2>{title}</h2>
            <div className="ui label">
            {tag_arr.map((t, idx) => <Label key={idx} as='a' tag>{t}</Label>)}
            </div>
            <small>{start_date} | {location}</small>
            <p>{description}</p>
            <LikeButton style={bottomStyle} event={event}/>
        </div>

    )
}

