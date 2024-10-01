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
                <p>Địa Chỉ Cụ Thể </p>
                <p>Quận 8, Thành Phố Hồ Chí Minh, Việt Nam</p>
                <p className="mt-3"><strong>Phone:</strong> <span>0123456789 </span></p>
                <p><strong>Email:</strong> <span>demo@demo.com</span></p>
              </div>
            </div>

            <div className="col-lg-4 col-md-3 footer-links">
              <h4>Đường Dẫn</h4>
              <ul>
                <li><Link to="/">Trang Chủ</Link></li>
                <li><Link to="/about-us">Về Chúng Tôi</Link></li>
                <li><Link to="/activity">Hoạt Động</Link></li>
                <li><Link to="/history">Lịch Sử Giải Đua</Link></li>
                <li><Link to="/contact">Liên Hệ</Link></li>
                
              </ul>
            </div>

            <div className="col-lg-4 col-md-3 footer-links">
              <h4>Dịch Vụ Của Chúng Tôi</h4>
              <ul>
                <li><Link to="/web-design">Thiết Kế Web</Link></li>
                <li><Link to="/web-development">Phát Triển Web</Link></li>
                <li><Link to="/product-management">Quản Lý Sản Phẩm</Link></li>
                <li><Link to="/marketing">Tiếp Thị</Link></li>
                <li><Link to="/graphic-design">Thiết Kế Đồ Họa</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
