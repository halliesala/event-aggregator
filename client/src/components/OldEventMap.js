import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MAPS_API_KEY from '../key'

export default function EventMap() {

    const containerStyle = {
        width: '400px',
        height: '400px'
    };
    
    const center = {
        lat: 40.8,
        lng: -74
    };

    //40.772464,-73.983489

    return (
        <>
            <h2>TODO: View Events on a Map</h2>
            <LoadScript googleMapsApiKey={MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    
                    <Marker position={center} />
                    
                </GoogleMap>
            </LoadScript>
        </>
    )
}

