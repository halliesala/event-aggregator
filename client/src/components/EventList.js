import { useState } from "react";
import EventCard from './EventCard'
import { useLoaderData } from 'react-router-dom'
import SearchBar from "./SearchBar";
import EventListHeader from "./EventListHeader";



export default function EventList() {

    const { events } = useLoaderData()
    const [searchTerm, setSearchTerm] = useState('')


    return (
        <>
            <h1>Events</h1>
            <EventListHeader />
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