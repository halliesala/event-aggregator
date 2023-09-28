import React from 'react';
import { Label } from 'semantic-ui-react';

export default function TagPanel({ tags, activeTags, setActiveTags }) {


    const tagStyle = {
        display: 'block',
        marginBottom: '10px'
    };

    function addTag(tag) {
        if (!activeTags.includes(tag)) {
            setActiveTags([...activeTags, tag])
        }
    }

    const containerStyle = {
        position: 'fixed',
        top: '10%',  // You can adjust this value as needed
        right: '10px',
        width: '150px', // Set a fixed width or whatever you prefer
        maxHeight: '80vh', // Set to 80% of the viewport height, or adjust as needed
        overflowY: 'scroll',
        zIndex: 1000, // This ensures the tags sit on top of other elements
        backgroundColor: 'white', // You might want a background to ensure tags are readable
        padding: '10px',
        border: '1px solid #ccc', // Optional, for better visibility
        borderRadius: '5px' // Optional, for aesthetics
    };

    return (
        <div style={containerStyle}>
            {tags.map(t => <a onClick={() => addTag(t)} style={tagStyle} class="ui label">{t}</a>)}
        </div>
    )

}