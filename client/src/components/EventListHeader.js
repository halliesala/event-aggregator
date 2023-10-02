import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react';

export default function EventListHeader() {
    return (
        <>  <Button as={Link} to="/events">List</Button>
            <Button as={Link} to="/events/map">Map</Button>
            <Button as={Link} to="/events/calendar">Calendar</Button>
            <div ></div>
        </>
    )
}