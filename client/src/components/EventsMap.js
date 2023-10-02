import { GoogleMap, LoadScript, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import MAPS_API_KEY from '../key'
import { useOutletContext, useLoaderData } from 'react-router-dom';
import { useRef, useEffect, useCallback, useState } from 'react';

export default function EventsMap() {

    const [loadTheDamnMarkers, setLoadTheDamnMarkers] = useState(false)
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

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        setLoadTheDamnMarkers(true)
    }, []);


    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: 40.782020568847656,
        lng: -73.96507263183594,
    };

    

    function onMarkerLoad(marker) {
        setLoadTheDamnMarkers(loadTheDamnMarkers + 1)
    }

    //40.772464,-73.983489

    if (!isLoaded) return <p>Map not yet loaded ...</p>


    const markers = events.map(e => {
        if (e.coords && loadTheDamnMarkers) {
            // console.log(e.coords)
            const coords = { lat: e.coords.lat, lng: e.coords.lng }
            return <MarkerF key={e.id} position={coords} onLoad={onMarkerLoad}/>
        }
        return null
    })

    return (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                onLoad={onMapLoad}
            >
                {markers}
            </GoogleMap>
        </>
    )
}

