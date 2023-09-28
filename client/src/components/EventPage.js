import { useParams, useLoaderData } from 'react-router-dom'

export default function Event() {
    const params = useParams();

    console.log(params);
  
    const { event } = useLoaderData()
  
    const {date, description, title, location} = event


    return (
        <div className="event-card">
            <h2>{title}</h2>
            <small>{date} | {location}</small>
            <p>{description}</p>
        </div>

    )
}