import { useParams, useLoaderData } from 'react-router-dom'
import { useState } from 'react';
import EventCard from './EventCard';
import SearchBar from './SearchBar';

export default function MyEvents() {
    const params = useParams();
    
    const { userEvents } = useLoaderData()

    const [searchTerm, setSearchTerm] = useState('')

    const mainContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', // Creates 4 rows
 // Distributes the children into columns across these rows
        gap: '10px' // Adjusts the gap between grid items
      };


    return (
        <>
            <h2>My Saved Events</h2>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <div style={mainContainerStyle}>
            {
                userEvents
                .filter(e => JSON.stringify(e).toLowerCase().includes(searchTerm.toLowerCase()))
                .map((e, idx) => {
                    return (
                        <EventCard key={idx} event={e} />
                    )
                })
            }
            </div>
        </>
    )
}