import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MAPS_API_KEY from '../key'
import { useOutletContext, useLoaderData } from 'react-router-dom';

export default function EventsMap() {

    
    const { events } = useLoaderData()

    console.log(events)

    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: 40.782020568847656,
        lng: -73.96507263183594,
    };

    const markers = events.map(e => {
        if (e.coords) {
            const coords = {lat: e.coords.lat, lng:e.coords.lng}
            const title = e.title
            return  <Marker key={e.id} position={coords} />
        }
        return null
    })
    console.log(markers)

    //40.772464,-73.983489

    return (
        <>
            <LoadScript googleMapsApiKey={MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                >

                    {markers}
                    
                </GoogleMap>
            </LoadScript>
        </>
    )
}

