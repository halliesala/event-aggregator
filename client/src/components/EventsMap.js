import { GoogleMap, LoadScript, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import MAPS_API_KEY from '../key'
import { useOutletContext, useLoaderData } from 'react-router-dom';
import { useRef, useEffect, useCallback, useState } from 'react';
import EventListHeader from './EventListHeader';
import SearchBar from './SearchBar';
import EventsPage from './EventsPage';
import EventCard from './EventCard';
import { Card, Grid } from 'semantic-ui-react';

export default function EventsMap() {

    const [loadTheDamnMarkers, setLoadTheDamnMarkers] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState()
    const { events } = useLoaderData()
    const mapRef = useRef(null);
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: MAPS_API_KEY
    });

    useEffect(() => {
        if (mapRef.current) {
            const bounds = new window.google.maps.LatLngBounds();
            events.forEach(event => {
                if (event.coords) {
                    bounds.extend(new window.google.maps.LatLng(event.coords.lat, event.coords.lng));
                }
            });
            mapRef.current.fitBounds(bounds);
        }
    }, [events, loadTheDamnMarkers]);

    useEffect(() => {
        console.log("Event selected: ", selectedEvent)
    }, [selectedEvent])

    
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        setLoadTheDamnMarkers(true)
    }, []);


    



    function onMarkerLoad(marker) {
        setLoadTheDamnMarkers(loadTheDamnMarkers + 1)
    }

    //40.772464,-73.983489

    if (!isLoaded) return <p>Map not yet loaded ...</p>


    const markers = events.map(e => {
        if (e.coords && loadTheDamnMarkers) {
            const coords = { lat: e.coords.lat, lng: e.coords.lng }
            return <MarkerF
                key={e.id}
                position={coords}
                onLoad={onMarkerLoad}
                onClick={() => {
                    setSelectedEvent(e)
                }}
            />
        }
        return null
    })

    if (!isLoaded) {
        return (
            <>
                <EventListHeader />
                <SearchBar />
                <p>Loading map ... </p>
            </>
        )
    } else {
        return (
            <>
                <EventListHeader />
                <Grid>
                    <Grid.Column width={10} >
                        <Map markers={markers} onMapLoad={onMapLoad} selectedEvent={selectedEvent}/>
                    </Grid.Column>
                    <Grid.Column width={6} >
                        {
                            selectedEvent
                            ? <EventCard event={selectedEvent} />
                            : <p>Click marker to see event details</p>
                        }
                    </Grid.Column>
                </Grid>
            </>
        )

    }

}

function Map({ markers, onMapLoad, selectedEvent }) {

    const containerStyle = {
        width: '100%',
        height: '500px'
    };

    const center = {
        lat: 40.782020568847656,
        lng: -73.96507263183594,
    };

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onMapLoad}
        >
            {markers}
            {
                selectedEvent
                ? (<MarkerF 
                    position={ {lat: selectedEvent.coords.lat, lng: selectedEvent.coords.lng} }
                    options={{icon: {
                        url: '/blue_marker_3.png',
                        scaledSize: new window.google.maps.Size(38, 38) // size in pixels
                    }}}
                />)
                : null
            }

        </GoogleMap>
    )
}

