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

export async function getUserEventsLoader({ params }) {
    const response = await fetch(`http://localhost:5555/user-events/user=${params.user_id}`);

    if (response.ok) {
        const userEvents = await response.json();
        return { userEvents };
    }

    throw response
}

export async function getSiteLoader() {
    const response = await fetch('http://localhost:5555/sites');
    const sites = await response.json();
    return { sites }
}