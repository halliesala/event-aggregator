import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MAPS_API_KEY from '../key'
import { useOutletContext } from 'react-router-dom';

export default function OldEventMap() {

    

    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: 40.782020568847656,
        lng: -73.96507263183594,
    };
    

    //40.772464,-73.983489

    return (
        <>
            <LoadScript googleMapsApiKey={MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                >

                    <Marker position={center} />

                </GoogleMap>
            </LoadScript>
        </>
    )
}

