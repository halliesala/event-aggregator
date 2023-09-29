import React, { useState, useEffect } from 'react';

export default function EventSorter({ events, dispEvents, setDispEvents }) {
  const [sort, setSort] = useState('0');

  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
  
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Returns distance in kilometers
  }

  function sortByDistance(objects, userLat, userLon) {
    return objects.sort((a, b) => {
        // Handle if either coords are null
        if (!a.coords) return 1;  // Move a to the end
        if (!b.coords) return -1; // Move b to the end

        // Calculate distances
        const distanceA = haversineDistance(userLat, userLon, a.coords.lat, a.coords.lng);
        const distanceB = haversineDistance(userLat, userLon, b.coords.lat, b.coords.lng);

        // Sort based on distances
        return distanceA - distanceB;
    });
}

  

  useEffect(() => {
    let sortedEvents = [...dispEvents]; // Create a copy of events to sort

    if (sort === '0') {
      // sort by id (You need to add the logic for this if required)
      sortedEvents.sort((a, b) => a.id - b.id);
      setDispEvents(sortedEvents);
    } else if (sort === '1') {
      // sort by distance (You need to add the logic for this if required)
      
      getLocationSort(dispEvents)
      
      
    } else if (sort === '2') {
      // sort by date
      for (let e of sortedEvents) {
        e['dateMs'] = Date.parse(e.start_date);
      }
      sortedEvents.sort((a, b) => a.dateMs - b.dateMs);
    }
    
    setDispEvents(sortedEvents); // Update the displayed events

  }, [sort, events, setDispEvents]); // This effect runs whenever sort or events change


  function getLocationSort(events) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => success(position, events), 
            error
        );
    } else {
        console.log("Geolocation not supported");
    }

    function success(position, currentEvents) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        console.log(currentEvents);
        const sorted = sortByDistance(currentEvents, longitude, latitude);
        setDispEvents(sorted);
    }

    function error() {
        console.log("Unable to retrieve your location");
    }

      
}
  return (
    <select className="ui dropdown" value={sort} onChange={(e) => setSort(e.target.value)}>
      <option value="0">Default</option>
      <option value="1">Sort by distance</option>
      <option value="2">Sort by date</option>
    </select>
  );
}

