import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

function Header({ user }) {
  return (
    <header className="main-header">
      <h1 class="ui header">Event Aggregator</h1>
      {
        user
          ? <h2>Hello, {user.f_name}!</h2>
          : <h2>NYC events curated for you</h2>
      }

      <nav>
        <Button as={Link} to="/events">All Events</Button>
        {
          user
            ? (
              <>
                <Button as={Link} to="/logout">Logout</Button>
                <Button as={Link} to={`/my-events/${user.id}`}>My Saved Events</Button>
              </>
            )
            :
            <Button as={Link} to="/authorization">Login or Sign Up</Button>
        }
      </nav>
      <div class="ui divider"></div>
    </header>
  )
}

export default Header

