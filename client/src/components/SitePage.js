import { useLoaderData } from "react-router-dom";
import React, { useEffect, useState} from 'react'
import SiteCard from "./SiteCard.js";
import AddSiteForm from "./AddSiteForm.js";
import { getSiteLoader } from "../loaders.js";


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

    async function reloadSites() {
        sites = await getSiteLoader()
    }
    

    return (
        <div>
        <AddSiteForm addSite={addSite}/>
        {localSites.map((s) => <SiteCard deleteSite={deleteSite} reloadSites={reloadSites} key={s.id} site={s}/>)}
        
        </div>
    )

}