import 'semantic-ui-css/semantic.min.css';
import React from 'react';

export default function SiteCard({site}) {
    return (
        <div className="ui divided items">
            <div className="item">
                <div className="middle aligned content">
                    <div className="content">
                        <div className="header">{site.url}</div>
                        <div className="description">
                            <p>{site.last_scraped}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}