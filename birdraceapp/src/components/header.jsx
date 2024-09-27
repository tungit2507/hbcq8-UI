import React from 'react';
import AOS from 'aos';
import { List } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Logout from '../pages/author/logout';
import 'aos/dist/aos.css';

const Header = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  let isLoggedIn = sessionStorage.getItem("isLoggedIn");

  const handleNavLinkClick = () => {
    const navMenu = document.getElementById('navmenu');
    if (navMenu.classList.contains('show')) {
      navMenu.classList.remove('show');
    }
  };

  return (
    <header id="header" className="header position-relative">
      <Navbar expand="lg" className="bg-light">
        <Container fluid className='container-xl position-relative d-flex align-items-center justify-content-between'>
          <Navbar.Brand href="index.html" className="logo d-flex align-items-center">
            <Link to={"/"}><img src="assets/img/logo.png" alt="AgriCulture" /></Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navmenu" className="mobile-nav-toggle d-xl-none">
            <List />
          </Navbar.Toggle>
          <Navbar.Collapse id="navmenu" className="navmenu justify-content-end">
            <Nav as="ul" className="list-unstyled">
              <Nav.Item as="li">
                <Nav.Link as={Link} to="/" className="nav-link" onClick={handleNavLinkClick}>Trang Chủ</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} to="/about-us" className="nav-link" onClick={handleNavLinkClick}>Về Chúng Tôi</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} to="/activity" className="nav-link" onClick={handleNavLinkClick}>Hoạt Động</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} to="/history" className="nav-link" onClick={handleNavLinkClick}>Lịch Sử Giải Đua</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} to="/contact" className="nav-link" onClick={handleNavLinkClick}>Liên Hệ</Nav.Link>
              </Nav.Item>
              <NavDropdown title="Tài Khoản" id="basic-nav-dropdown custom-dropdown-menu" align="start">
                {isLoggedIn === "true" ? 
                  <ul>
                    <NavDropdown.Item as="li" className="dropdown-item nav-link"><Link to={"/profile"} onClick={handleNavLinkClick}>{currentUser ? currentUser.username : ''}</Link></NavDropdown.Item>
                    <NavDropdown.Item as="li" className="dropdown-item nav-link"><Logout /></NavDropdown.Item>
                  </ul>
                  :
                  <ul>
                    <NavDropdown.Item as="li" className="dropdown-item nav-link"><Link to={"/login"} onClick={handleNavLinkClick}>Đăng Nhập</Link></NavDropdown.Item>
                    <NavDropdown.Item as="li" className="dropdown-item nav-link"><Link to={'/register'} onClick={handleNavLinkClick}>Đăng Ký</Link></NavDropdown.Item>
                  </ul>
                }
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;