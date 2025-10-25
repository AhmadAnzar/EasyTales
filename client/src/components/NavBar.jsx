import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpg';
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
        <Link to="/home" className="navbar-logo">
          <img src={logo} alt="EasyTales Logo" className="logo-icon" />
          EasyTales
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/home" className="navbar-link">
              Home
            </Link>
          </li>
          {isAuthenticated && (
            <>
              <li className="navbar-item">
                <Link to="/write" className="navbar-link navbar-link-primary">
                   Write
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/my-stories" className="navbar-link">
                  My Stories
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/profile" className="navbar-link navbar-profile-link">
                  <span className="navbar-profile-initial">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                  {user?.username || 'Profile'}
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
