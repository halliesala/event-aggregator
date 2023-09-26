import { Link } from 'react-router-dom';

function Header({ user }) {
  return (
    <header className="main-header">
      <h1>Event Aggregator</h1>
      {
        user 
        ? <h2>Welcome back, {user.f_name}!</h2>
        : <h2>NYC events curated for you</h2>
      }
      
      <nav>
        <Link to="/events">Events</Link>
        <Link to="/authorization">Login</Link>
        {
            user
            ? <Link to="/logout">Logout</Link>
            : null
        }
      </nav>
    </header>
  )
}

export default Header
