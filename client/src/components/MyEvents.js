import { useParams, useLoaderData } from 'react-router-dom'
import EventCard from './EventCard';

export default function MyEvents() {
    const params = useParams();
    console.log("Logging params", params);
    
    const { userEvents } = useLoaderData()
    console.log("userEvents", userEvents)

    return (
        <>
            <h2>My Saved Events</h2>
            {
                userEvents.map((e, idx) => {
                    return (
                        <EventCard key={idx} event={e} />
                    )
                })
            }
        </>
    )
}