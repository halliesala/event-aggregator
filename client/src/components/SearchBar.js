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

<div class="ui icon input">
  <input value={searchTerm} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search..."></input>
  <i onClick={handleSubmit} class="inverted circular search link icon"></i>
</div>
           

        </>
    )
}