import { useState } from "react";
import EventCard from './EventCard'
import { useLoaderData } from 'react-router-dom'
import SearchBar from "./SearchBar";


export default function EventList() {

    const { events } = useLoaderData()
    const [searchTerm, setSearchTerm] = useState('')

    // setDisplayEvents(events.filter(event => JSON.stringify(event).toLowerCase().includes(searchTerm.toLowerCase())))


    return (
        <>
            <h1>Events</h1>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <div className="ui stackable four column grid">
            {
                events
                .filter(e => JSON.stringify(e).toLowerCase().includes(searchTerm.toLowerCase()))
                .map(e => {
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