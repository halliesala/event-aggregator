export async function getEventsLoader() {
    const response = await fetch('http://localhost:5555/events');
    const events = await response.json();
    return { events }
}

export async function getEventLoader({ params }) {
    const response = await fetch(`http://localhost:5555/events/${params.id}`);

    if (response.ok) {
        const event = await response.json();
        return { event };
    }

    throw response;
}