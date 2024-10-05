import React from 'react';
import AOS from 'aos';
import { List } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useEffect } from 'react';
import Logout from '../pages/author/logout';
import 'aos/dist/aos.css';
import { toast, ToastContainer } from 'react-toastify';

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

  const handleFeatureUnderDevelopment = () => {
    toast.info('Tính năng đang phát triển');
  };

  return (
    <header id="header" className="header position-relative">
      <Navbar expand="lg" className="bg-light">
        <Container fluid className='container-xl position-relative d-flex align-items-center justify-content-between'>
          <Navbar.Brand href="index.html" className="logo d-flex align-items-center">
            <Link to={"/"}><img src="./assets/img/logo/logo.jpg" alt="AgriCulture" /></Link>
            <span className='logo-span'>Hội Bồ Câu Quận 8</span>
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
                <Nav.Link as={Link} onClick={handleFeatureUnderDevelopment} className="nav-link">Về Chúng Tôi</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} onClick={handleFeatureUnderDevelopment} className="nav-link">Hoạt Động</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} 
                to="/history"
                 className="nav-link" onClick={handleNavLinkClick}>Lịch Sử Giải Đua</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} onClick={handleFeatureUnderDevelopment} className="nav-link">Liên Hệ</Nav.Link>
              </Nav.Item>
              <NavDropdown title="Tài Khoản" id="basic-nav-dropdown custom-dropdown-menu" align="start">
                {isLoggedIn === "true" ? 
                  <ul>
                    <NavDropdown.Item as="li" className="dropdown-item nav-link">
                      <Link to={"/birds"}>Quản Lý Chim Đua</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item as="li" className="dropdown-item nav-link">
                      <Link to={"/profile"}>Tài Khoản ({currentUser ? currentUser.username : ''}) </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item as="li" className="dropdown-item nav-link">
                      <Logout />
                    </NavDropdown.Item>
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
      <ToastContainer 
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      >

      </ToastContainer>
    </header>
  );
};

export default Header;