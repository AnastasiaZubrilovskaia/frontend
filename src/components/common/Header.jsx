import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/flowers">Flowers</Link>
        {user && (
          <>
            <Link to="/orders">My Orders</Link>
            {['manager', 'admin'].includes(user.role) && (
              <Link to="/reports">Reports</Link>
            )}
            <Link to="/profile">Profile</Link>
          </>
        )}
        {!user ? (
          <Link to="/auth">Login</Link>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </nav>
      {user && <div className="welcome">Welcome, {user.name}!</div>}
    </header>
  );
};

export default Header;