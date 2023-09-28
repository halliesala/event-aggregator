import { useParams, useLoaderData } from 'react-router-dom'
import { useState } from 'react';
import EventCard from './EventCard';
import SearchBar from './SearchBar';

export default function MyEvents() {
    const params = useParams();
    
    const { userEvents } = useLoaderData()

    const [searchTerm, setSearchTerm] = useState('')


    return (
        <>
            <h2>My Saved Events</h2>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            {
                userEvents
                .filter(e => JSON.stringify(e).toLowerCase().includes(searchTerm.toLowerCase()))
                .map((e, idx) => {
                    return (
                        <EventCard key={idx} event={e} />
                    )
                })
            }
        </>
    )
}