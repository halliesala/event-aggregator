import { Link, useRouteError } from 'react-router-dom';
import Header from './Header';
import { Grid, Image } from 'semantic-ui-react';

export default function ErrorPage() {

    const error = useRouteError();


    return (
        <>
            <Header />
            <Grid>
                <Grid.Column width={6} >
                    <Image 
                        src="/ja-tuchka-tuchka.jpg" 
                        alt="Winnie the Pooh holds tight to a blue balloon as an angry swarm of bees approaches."
                    />
                    {/* <img src="/ja-tuchka-tuchka.jpg" alt="Winnie the Pooh holds tight to a blue balloon as an angry swarm of bees approaches."/> */}
                </Grid.Column>
                <Grid.Column width={6} >
                    <div>
                        <h2>{error.status}: {error.statusText}</h2>
                        <p>You probably want to be somewhere else. Go <Link to="/events">home</Link>?</p>
                    </div>
                </Grid.Column>

            </Grid>
        </>
    )
}