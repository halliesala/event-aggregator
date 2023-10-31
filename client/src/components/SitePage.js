import { useLoaderData } from "react-router-dom";
import React, { useEffect, useState} from 'react'
import SiteCard from "./SiteCard.js";
import AddSiteForm from "./AddSiteForm.js";
import { getSiteLoader } from "../loaders.js";
import { Button } from 'semantic-ui-react'


export default function SitePage({}) {
    const [localSites, setLocalSites] = useState([])
    let {sites} = useLoaderData()
    useEffect(() => {setLocalSites(sites)}, [sites])

    function addSite(url) {
        const OPTIONS = {
            method:"POST",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify({"url":url})
        }
        fetch("http://localhost:5555/sites", OPTIONS)
        .then(resp => resp.json())
        .then(data => setLocalSites([...localSites, data]))
    }

    function deleteSite(site) {
        console.log(site.id)
        const OPTIONS = {
            method:"DELETE",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        }

        fetch("http://localhost:5555/sites/"+site.id, OPTIONS)
        .then(resp => resp.json())
        .then(data => setLocalSites(sites.filter(site => site.id !== data.id)))
    }

    function getCoords() {
        fetch("http://localhost:5555/getcoords")
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    async function reloadSites() {
        sites = await getSiteLoader()
    }
    const mainContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', // Creates 4 rows
 // Distributes the children into columns across these rows
        gap: '10px' // Adjusts the gap between grid items
      };
    

    return (
        <div>
        <AddSiteForm addSite={addSite}/>
        <div>
            <Button color="green" onClick={getCoords}>Get Coordinates</Button>
        </div>
        <div style={mainContainerStyle}>
        {localSites.map((s) => <SiteCard deleteSite={deleteSite} reloadSites={reloadSites} key={s.id} site={s}/>)}
        </div>
        
        </div>
    )

}