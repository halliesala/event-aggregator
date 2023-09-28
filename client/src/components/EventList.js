import { useParams, useLoaderData } from 'react-router-dom'
import EventCard from './EventCard'
<<<<<<< Updated upstream
import { useLoaderData } from 'react-router-dom'
import SearchBar from "./SearchBar";
import EventListHeader from "./EventListHeader";

=======
>>>>>>> Stashed changes

export default function EventList({ events }) {
    
    const eventStyle = {
        margin: '10px'
    }

    const columnStyle = {
        margin: '1px 1px',  // Add margin to top and bottom and left and right
        transform: 'translate(40px)'
    };

<<<<<<< Updated upstream
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


=======
    const contentContainerStyle = {
        flexGrow: 1,
        marginRight: '10px', // This should be slightly more than the width of the tag container to avoid touching.
        padding: '10px'
    };


    return (
        <div className="ui stackable five column grid" style={contentContainerStyle}>
       {events.map(e =>
       (
        <div className='column' style={columnStyle}>
         <EventCard style = {eventStyle} event={e}/>
        </div>
        ))}
       </div>
>>>>>>> Stashed changes
    )
}