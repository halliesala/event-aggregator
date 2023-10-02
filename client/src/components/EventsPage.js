import { useState, useEffect } from "react";
import EventCard from './EventCard'
import { useLoaderData } from 'react-router-dom'
import SearchBar from "./SearchBar";
import TagPanel from "./TagPanel";
import EventList from "./EventList";
import EventListHeader from "./EventListHeader";
import EventSorter from "./EventSorter";


export default function EventsPage() {

    let { events } = useLoaderData()

    const [dispEvents, setDispEvents] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [activeTags, setActiveTags] = useState([])
    //console.log(dispEvents[0].tags)

    useEffect(() => setDispEvents(events), [events])


    const mainContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    };

    function removeTag(tag) {
        setActiveTags(activeTags.filter(t => t !== tag))
    }

    useEffect(() => {
        console.log("Active tags", activeTags)
        if (activeTags.length > 0) {
            let filtered_events = events.filter(e => {
                try {
                    const validJSON = e.tags.replace(/'/g, '"');
                    const tag_arr = JSON.parse(validJSON);

                    // Check if every tag in activeTags is present in tag_arr
                    return activeTags.every(tag => tag_arr.includes(tag));
                } catch (err) {
                    console.log(err);
                    return false;  // If there's an error (like invalid JSON), exclude the event
                }
            });

            setDispEvents(filtered_events);
        } else {
            setDispEvents(events);  // Reset to all events if no tags are active
        }
    }, [activeTags]);



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
    
    function handleSearch(search) {
        if(search.length > 0) {
            setDispEvents(dispEvents.filter(e => e.title.toLowerCase().includes(search.toLowerCase())))
        } else {
            setDispEvents(events)
        }
    }
    
    console.log('Rendering EventsPage with', dispEvents);
    return (
        
        <>
            <div>
                <h1>Events</h1>
                <EventListHeader />
                <EventSorter events={events} dispEvents={dispEvents} setDispEvents={setDispEvents}/>
                <SearchBar handleSearch={handleSearch} />
                {activeTags.map(t => <a key={t} onClick={() => removeTag(t)} className="ui label">{t}</a>)}
            </div>
            <div class="ui divider"></div>
            <div style={mainContainerStyle}>

                <TagPanel tags={event_tags} activeTags={activeTags} setActiveTags={setActiveTags} />
                <div style={contentContainerStyle}>
                    <EventList events={dispEvents} />
                </div>

            </div>
        </>


    )
}