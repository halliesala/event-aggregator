import { Label } from 'semantic-ui-react'
import LikeButton from './LikeButton';
import { Card, Icon, Image } from 'semantic-ui-react'

export default function EventCard({ event }) {

    const { start_date, description, title, location, tags } = event
    const validJSON = tags.replace(/'/g, '"');
    let tag_arr
    try {
        tag_arr = JSON.parse(validJSON)
    } catch (e) {
        tag_arr = []
    }

    const bottomStyle = {
        position: 'absolute',
        bottom: 0
    }


    return (
        <Card style={{ height: '400px', overflow: 'hidden' }}>
            <div style={{ height: '60%', overflow: 'hidden' }}>
                <Image
                    src={event.img_link}
                    wrapped
                    ui={true}
                    style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'cover',
                        display: 'block'
                    }}
                />
            </div>
            <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Meta>
                    <div className="ui label">
                        {tag_arr.map((t, idx) => <Label key={idx} as='a' tag>{t}</Label>)}
                    </div>
                    <small>{start_date} | {location}</small>
                </Card.Meta>
                <p>{description}</p>
            </Card.Content>
            <LikeButton style={bottomStyle} event={event} />
        </Card>
    );
}

