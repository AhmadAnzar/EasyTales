import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">📚 EasyTales</h3>
          <p className="footer-description">
            Collaborate, create, and share stories with the world.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/write">Write</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Community</h4>
          <ul className="footer-links">
            <li>
              <Link to="/guidelines">Guidelines</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/support">Support</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Connect</h4>
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Twitter">
              🐦
            </a>
            <a href="#" className="social-link" aria-label="GitHub">
              💻
            </a>
            <a href="#" className="social-link" aria-label="Discord">
              💬
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} EasyTales. All rights reserved.</p>
        <div className="footer-legal">
          <Link to="/privacy">Privacy Policy</Link>
          <span>•</span>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
