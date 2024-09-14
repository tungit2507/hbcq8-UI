import React from 'react';
import { List } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'

const Header = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <header id="header" className="header position-relative">
      <Navbar expand="lg" className="bg-light">
        <Container fluid>
          <Navbar.Brand href="index.html" className="d-flex align-items-center">
            <Link to={"/"}><img src="assets/img/logo.png" alt="AgriCulture" /></Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navmenu" className="mobile-nav-toggle d-xl-none">
            <List />
          </Navbar.Toggle>
          <Navbar.Collapse id="navmenu" className="navmenu justify-content-end">
            <Nav as="ul" className="list-unstyled">
              <Nav.Item as="li">
                <Nav.Link as={Link} to="/" className="nav-link">Trang Chủ</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} to="/about-us" className="nav-link">Về Chúng Tôi</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} to="/activity" className="nav-link">Hoạt Động</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} to="/history" className="nav-link">Lịch Sử Giải Đua</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} to="/contact" className="nav-link">Liên Hệ</Nav.Link>
              </Nav.Item>
              <NavDropdown title="Tài Khoản">
                <ul>
                <NavDropdown.Item as="li" className="dropdown-item nav-link"><Link to={"/login"} >Đăng Nhập</Link></NavDropdown.Item>
                <NavDropdown.Item as="li" to="/register" className="dropdown-item nav-link" ><Link to={"/register"} className="">Đăng Ký</Link></NavDropdown.Item>
                </ul>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
