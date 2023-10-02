import { useState } from 'react';

export default function SearchBar({ handleSearch }) {
    const [searchTerm, setSearchTerm] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        console.log("Form submitted -- searchTerm is ", searchTerm)
    }

    function setSearch(search) {
        setSearchTerm(search)
        handleSearch(search)
    }

    return (
        <>
            <form class="ui form" onSubmit={handleSubmit}>
                <div class="two fields">
                    <div class="field">
                        <input
                            type="text"
                            name="search"
                            value={searchTerm}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <input
                            type="submit"
                            value="Search"
                        />
                    </div>
                </div>
            </form>

        </>
    )
}