import { useState } from "react";
import EventCard from './EventCard'
import { useLoaderData } from 'react-router-dom'
import SearchBar from "./SearchBar";
import TagPanel from "./TagPanel";
import EventList from "./EventList";


export default function EventsPage() {

    const { events } = useLoaderData()
    const [dispEvents, setDispEvents] = useState(events)
    const [searchTerm, setSearchTerm] = useState('')
    const [activeTags, setActiveTags] =  useState([])

    const mainContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    };

    function removeTag(tag) {
        setActiveTags(activeTags.filter(t => t !== tag))
    }

    if (activeTags) {
        for (e in dispEvents) {
            try {
                const validJSON = e.tags.replace(/'/g, '"');
                tag_arr = JSON.parse(validJSON)


            } catch (e) {

            }
        }

    }

    
    
    const contentContainerStyle = {
        flexGrow: 1,
        marginRight: '170px' // This should be slightly more than the width of the tag container to avoid touching.
    };

    // setDisplayEvents(events.filter(event => JSON.stringify(event).toLowerCase().includes(searchTerm.toLowerCase())))
    const event_tags = [
        "Music", "Happy-hour", "Food", "Networking", "Art", "Workshop", "Sports", 
        "Charity", "Education", "Festival", "Outdoor", "Performance", "Lecture",
        "Seminar", "Conference", "Dance", "Film", "Theater", "Comedy", "Literature",
        "Family-friendly", "Cultural", "Fashion", "Craft", "Exhibition", "Fitness",
        "Yoga", "Meditation", "Technology", "Fundraiser", "Auction", "Launch", 
        "Celebration", "Spiritual", "Culinary", "Wine-tasting", "Beer-tasting", 
        "Pop-up", "DIY", "Virtual", "Adventure", "Travel", "Nightlife", "Rave", "Retreat",
        "Reunion", "Gaming", "Role-playing", "Cosplay", "Market", "Trade-show"
        ]

    return (
        <>
        <h1>Events</h1>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            {activeTags.map(t => <a onClick={()=>removeTag(t)} class="ui label">{t}</a>)}
        <div style={mainContainerStyle}>
            <TagPanel tags={event_tags} activeTags={activeTags} setActiveTags={setActiveTags}/>
            <EventList events = {dispEvents}/>

        </div>
        </>


    )
}