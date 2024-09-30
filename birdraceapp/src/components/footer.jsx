import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="footer" className="footer dark-background">
      <div className="footer-top">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <Link to="/" className="logo d-flex align-items-center">
                <span className="sitename">Hội Bồ Câu Q8</span>
              </Link>
              <div className="footer-contact pt-3">
                <p>A108 Adam Street</p>
                <p>New York, NY 535022</p>
                <p className="mt-3"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
                <p><strong>Email:</strong> <span>info@example.com</span></p>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About us</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/terms">Terms of service</Link></li>
                <li><Link to="/privacy">Privacy policy</Link></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li><Link to="/web-design">Web Design</Link></li>
                <li><Link to="/web-development">Web Development</Link></li>
                <li><Link to="/product-management">Product Management</Link></li>
                <li><Link to="/marketing">Marketing</Link></li>
                <li><Link to="/graphic-design">Graphic Design</Link></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Hic solutasetp</h4>
              <ul>
                <li><Link to="/molestiae">Molestiae accusamus iure</Link></li>
                <li><Link to="/excepturi">Excepturi dignissimos</Link></li>
                <li><Link to="/suscipit">Suscipit distinctio</Link></li>
                <li><Link to="/dilecta">Dilecta</Link></li>
                <li><Link to="/sit-quas">Sit quas consectetur</Link></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Nobis illum</h4>
              <ul>
                <li><Link to="/ipsam">Ipsam</Link></li>
                <li><Link to="/laudantium">Laudantium dolorum</Link></li>
                <li><Link to="/dinera">Dinera</Link></li>
                <li><Link to="/trodelas">Trodelas</Link></li>
                <li><Link to="/flexo">Flexo</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
