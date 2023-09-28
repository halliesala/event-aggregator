import { Link } from "react-router-dom";

export default function EventListHeader() {
    return (
        <>
            <Link to="/events">List</Link>
            <Link to="/events/map">Map</Link>
            <Link to="/events/calendar">Calendar</Link>
        </>
    )
}