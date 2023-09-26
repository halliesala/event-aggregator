import { Link } from 'react-router-dom';

function Header({ user }) {
  return (
    <header className="main-header">
      <h1>Event Aggregator</h1>
      {
        user 
        ? <h2>Hello, {user.f_name}!</h2>
        : <h2>NYC events curated for you</h2>
      }
      
      <nav>
        <Link to="/events">All Events</Link>
        {
            user
            ? (
                <>
                  <Link to="/logout">Logout</Link>
                  <Link to="/my-events">My Saved Events</Link>
                </>
              )
            : <Link to="/authorization">Login or Sign Up</Link>
        }
      </nav>
    </header>
  )
}

export default Header
