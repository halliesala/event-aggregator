import {React} from "react";
import EventCard from './EventCard'
import { useLoaderData } from 'react-router-dom'


export default function EventList() {

    const { events } = useLoaderData()

    return (
        <>
            <h1>Events</h1>
            {
                events.map((e) => {
                    return <EventCard key={e.id} event={e}/>
                })
            }
        </>


    )
}