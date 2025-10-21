import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './NavBar.css';

const NavBar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📚</span>
          EasyTales
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-link">
              About
            </Link>
          </li>
          {isAuthenticated && (
            <>
              <li className="navbar-item">
                <Link to="/write" className="navbar-link navbar-link-primary">
                  ✍️ Write
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/my-stories" className="navbar-link">
                  My Stories
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/profile" className="navbar-link">
                  👤 {user?.username || 'Profile'}
                </Link>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-link navbar-button">
                  Logout
                </button>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <>
              <li className="navbar-item">
                <Link to="/signin" className="navbar-link">
                  Sign In
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/signup" className="navbar-link navbar-link-primary">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
