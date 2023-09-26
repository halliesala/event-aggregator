import 'semantic-ui-css/semantic.min.css';
import React, { useState } from 'react';

export default function SiteCard({ site, deleteSite, reloadSites }) {
    const [loading, setLoading] = useState(false)

    async function scrapeSite(site) {
        if (loading) {
            return
        }
        setLoading(true)
        await fetch("http://localhost:5555/scrape/" + site.id)
        setLoading(false)
        reloadSites()
    }

    async function processSite(site) {
        if (loading) {
            return
        }
        setLoading(true)
        await fetch("http://localhost:5555/process/" + site.id)
        setLoading(false)
    }


    return (
        <div className="ui card" >
            <div className="content" >
                <div className="header">{site.url}</div>
                {
                    site.last_scraped ? <div className="meta">Last Scraped: {site.last_scraped}</div> :
                        <div className="meta">Last Scraped: Never</div>
                }
                {
                    loading ? <button class="ui primary loading button">Loading</button> :
                        <button onClick={() => scrapeSite(site)} className="ui primary button">Scrape</button>
                }
                {
                    loading ? <button class="ui secondary loading button">Loading</button> :
                        <button onClick={() => processSite(site)} className="ui secondary button">Process Scraped Data</button>
                }
                <button onClick={() => deleteSite(site)} className="ui button">Delete</button>
            </div>
        </div>
    );

}