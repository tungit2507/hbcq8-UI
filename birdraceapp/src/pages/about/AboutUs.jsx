import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';
import { useEffect } from 'react';

const AboutUs = () => {

    useEffect(() => {
        const lightbox = GLightbox({
            selector: '.glightbox',
        });

        return () => {
            lightbox.destroy();
        };
    }, []);

    return (
        <div className='about-page'>
            <VideoAboutUs />
            <TeamAboutUs />
            {/* <ServicesAboutUs /> */}
        </div>
    );

};


const VideoAboutUs = () => {
    return (
        <section id="about-3" className="about-3 section">
            <div className="container">
                <div className="row gy-4 justify-content-between align-items-center">
                    <div className="col-lg-6 order-lg-2 position-relative" data-aos="zoom-out">
                        <img src="assets/img/img_sq_1.jpg" alt="Câu Lạc Bộ Chim Bồ Câu" className="img-fluid" />
                        <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox pulsating-play-btn">
                            <span className="play"><i className="bi bi-play-fill"></i></span>
                        </a>
                    </div>
                    <div className="col-lg-5 order-lg-1" data-aos="fade-up" data-aos-delay="100">
                        <h2 className="content-title mb-4">Câu Lạc Bộ Bồ Câu Đua Quận 8</h2>
                        <p className="mb-4">
                            Chào mừng đến với Câu Lạc Bộ Chim Bồ Câu của chúng tôi! Chúng tôi tận tâm chăm sóc và huấn luyện chim bồ câu.
                            Câu lạc bộ của chúng tôi cung cấp một cộng đồng cho những người yêu thích chim bồ câu để chia sẻ kiến thức và kinh nghiệm.
                        </p>
                        <ul className="list-unstyled">
                            <li>Tìm hiểu về chăm sóc chim bồ câu</li>
                            <li>Tham gia các cuộc đua chim bồ câu</li>
                            <li>Kết nối với những người yêu thích chim bồ câu khác</li>
                        </ul>
                        {/* <p className='padding'><a href="#" className="btn-cta">Liên hệ với chúng tôi</a></p> */}
                    </div>
                </div>
            </div>
        </section>
    );
}


const TeamAboutUs = () => {
    return (
        <section className="team-15 team section" id="team">
            <div className="container section-title" data-aos="fade-up">
                <h2>Ban Quản Lý Câu Lạc Bộ</h2>
                {/* <p>Necessitatibus eius consequatur</p> */}
            </div>

            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="person">
                                <figure>
                                    <img src="assets/img/team/team-1.jpg" alt="Image" className="img-fluid" />
                                    {/* <div className="social">
                                        <a href="#"><span className="bi bi-facebook"></span></a>
                                        <a href="#"><span className="bi bi-twitter-x"></span></a>
                                        <a href="#"><span className="bi bi-linkedin"></span></a>
                                    </div> */}
                                </figure>
                                <div className="person-contents">
                                    <h3>Nguyễn Văn A</h3>
                                    <span className="position">Chủ Tịch Câu Lạc Bộ</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="person">
                                <figure>
                                    <img src="assets/img/team/team-2.jpg" alt="Image" className="img-fluid" />
                                    {/* <div className="social">
                                        <a href="#"><span className="bi bi-facebook"></span></a>
                                        <a href="#"><span className="bi bi-twitter-x"></span></a>
                                        <a href="#"><span className="bi bi-linkedin"></span></a>
                                    </div> */}
                                </figure>
                                <div className="person-contents">
                                    <h3>Nguyễn Văn B</h3>
                                    <span className="position">Phó Chủ Tịch</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="person">
                                <figure>
                                    <img src="assets/img/team/team-3.jpg" alt="Image" className="img-fluid" />
                                    {/* <div className="social">
                                        <a href="#"><span className="bi bi-facebook"></span></a>
                                        <a href="#"><span className="bi bi-twitter-x"></span></a>
                                        <a href="#"><span className="bi bi-linkedin"></span></a>
                                    </div> */}
                                </figure>
                                <div className="person-contents">
                                    <h3>Nguyễn Văn C</h3>
                                    <span className="position">Bí Thư</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="person">
                                <figure>
                                    <img src="assets/img/team/team-4.jpg" alt="Image" className="img-fluid" />
                                    {/* <div className="social">
                                        <a href="#"><span className="bi bi-facebook"></span></a>
                                        <a href="#"><span className="bi bi-twitter-x"></span></a>
                                        <a href="#"><span className="bi bi-linkedin"></span></a>
                                    </div> */}
                                </figure>
                                <div className="person-contents">
                                    <h3>Nguyễn Văn D</h3>
                                    <span className="position">Quản Lý</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const ServicesAboutUs = () => {
    return (
        <div>
        <h2>Services</h2>
        </div>
    );
}



export default AboutUs;