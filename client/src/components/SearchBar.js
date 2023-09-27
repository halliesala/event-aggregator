import { useState } from 'react';

export default function SearchBar({searchTerm, setSearchTerm}) {

    function handleSubmit(e) {
        e.preventDefault()
        console.log("Form submitted -- searchTerm is ", searchTerm)
        setSearchTerm('')
    }

    return (
        <>
            <h2>TODO: Implement Search Bar</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search</label>
                <input 
                    type="text"
                    name="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input
                    type="submit"
                    value="Search"
                />
            </form>

        </>
    )
}