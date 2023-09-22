export async function getEventsLoader() {
    const response = await fetch('http://localhost:5555/events');
    const events = await response.json();
    return { events }
}

// export async function getGameByIdLoader({ params }) {
//     const response = await fetch(`http://localhost:5000/games/${params.id}`);

//     if (response.ok) {
//         const game = await response.json();
//         return { game };
//     }

//     throw response;
// }