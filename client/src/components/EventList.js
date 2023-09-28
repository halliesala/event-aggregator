import { useState } from "react";
import EventCard from './EventCard'

const eventCardStyle = {  // for example, adjust as needed
    margin: '10px',
    
       // this acts as an offset, adjust as needed
};

export default function EventList({ events }) {
    const [searchTerm, setSearchTerm] = useState('')
    return (
        <>

            <div className="ui stackable four column grid">
            {
                events
                .filter(e => JSON.stringify(e).toLowerCase().includes(searchTerm.toLowerCase()))
                .map(e => {
                    return (

                    <div key={e.id} className="column">
                    <EventCard  style={eventCardStyle} event={e}/>
                    </div>
                    )
                })
                
            }
            </div>
        </>


    )
}