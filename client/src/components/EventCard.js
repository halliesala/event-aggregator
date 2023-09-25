export default function EventCard({event}) {

    const {date, description, title, location} = event


    return (
        <div className="event-card">
            <h2>{title}</h2>
            <small>{date} | {location}</small>
            <p>{description}</p>
        </div>

    )
}