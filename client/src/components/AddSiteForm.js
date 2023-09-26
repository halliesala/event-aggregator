import { useState } from 'react'

export default function AddSiteForm({ addSite }) {
    const [url, setUrl] = useState();

    function handleAdd() {
        addSite(url)
        setUrl("")
    }

    return (
        <div className="ui labeled input">
            <div className="ui label">
                http://
            </div>
            <input value={url} onChange={(e) => setUrl(e.target.value)} type="text" placeholder="scrape-me.com"/>
            <button onClick={() => handleAdd()} className="ui button">Add Site</button>
        </div>
    )
}