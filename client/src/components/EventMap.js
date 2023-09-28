import React, { useEffect, useRef } from 'react';
import MAPS_API_KEY from '../key'
import EventListHeader from './EventListHeader';


export default function EventMap() {
  const mapDivRef = useRef(null);

  function initMap() {
    if (!window.google) {
          console.error('Google Maps API script not loaded');
          return;
        }

    const myLatLng = {
      lat: 40.782020568847656,
      lng: -73.96507263183594,
    };


    const coords = [
      {
        lat: 40.782020568847656,
        lng: -73.96507263183594,
      },
      {
        lat: 40.781020568847656,
        lng: -73.96407263183594,
      },
      {
        lat: 40.783020568847656,
        lng: -73.96507263183594,
      }
    ]
  
    const map = new window.google.maps.Map(mapDivRef.current, {
      zoom: 14,
      center: myLatLng,
      fullscreenControl: false,
      zoomControl: true,
      streetViewControl: false,
    });

    
    // Add pin to map for each location
    coords.forEach(coord => {
      new window.google.maps.Marker({
        position: coord,
        map,});
      })

  }
  
  useEffect(() => {
    window.initMap = initMap;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  
    script.onload = () => {
      // Initialize the map after the script is loaded
      initMap();
    };
  
    return () => {
      // Clean up on component unmount
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <h2>TODO: Put event pins on map</h2>
      <EventListHeader />
      <div ref={mapDivRef} style={{ width: '100%', height: '400px' }} />
    </>
  );
}







  