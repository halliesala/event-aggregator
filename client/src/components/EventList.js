import {useEffect, useState, React} from "react";
import { getEventsLoader } from "../loaders";
import Event from './Event'

export default function EventList() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:5555/events')
        .then(r => r.json())
        .then(event_list => {
            console.log(event_list)
            setEvents(event_list)
        })
    },
    [])

    return (
        <>
            <h1>Events</h1>
            {
                events.map((e) => {
                    return <Event key={e.id} event={e}/>
                })
            }
        </>


    )
}