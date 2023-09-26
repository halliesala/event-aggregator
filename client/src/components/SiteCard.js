import 'semantic-ui-css/semantic.min.css';
import React from 'react';

export default function SiteCard({site}) {
    return (
        <div className="ui card">
            <div className="content">
                <div className="header">{site.url}</div>
                <div className="meta">
                    Last scraped: {site.last_scraped}
                </div>
            </div>
        </div>
    );
    
}