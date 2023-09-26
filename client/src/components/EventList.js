import {React} from "react";
import EventCard from './EventCard'
import { useLoaderData } from 'react-router-dom'


export default function EventList() {

    const { events } = useLoaderData()

    return (
        <>
            <h1>Events</h1>
            <div className="ui stackable four column grid">
            {
                events.map((e) => {
                    return (

                    <div key={e.id} className="column">
                    <EventCard  event={e}/>
                    </div>
                    )
                })
                
            }
            </div>
        </>


    )
}