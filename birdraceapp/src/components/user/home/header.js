
import "../../../asets/css/header.css";

function Header(params) {
    return (
        <section className="main swiper mySwiper">
            <div className="wrapper swiper-wrapper">
                <div className="slide swiper-slide">
                    <img src="images/img1.jpg" alt="" className="image" />
                    <div className="image-data">
                        <span className="text">Enjoy the finest coffee drinks.</span>
                        <h2>
                            Enjoy Our Exclusive <br />
                            Coffee and Cocktails
                        </h2>
                        <a href="#" className="button">About Us</a>
                    </div>
                </div>
                <div className="slide swiper-slide">
                    <img src="images/img2.jpg" alt="" className="image" />
                    <div className="image-data">
                        <span className="text">We really like what we do.</span>
                        <h2>
                            Coffee Beans with a <br />
                            Perfect Aroma
                        </h2>
                        <a href="#" className="button">About Us</a>
                    </div>
                </div>
                <div className="slide swiper-slide">
                    <img src="images/img3.jpg" alt="" className="image" />
                    <div className="image-data">
                        <span className="text">Making Our coffee with lover.</span>
                        <h2>
                            Alluring and Fragrant <br />
                            Coffee Aroma
                        </h2>
                        <a href="#" className="button">About Us</a>
                    </div>
                </div>
            </div>
            <div className="swiper-button-next nav-btn"></div>
            <div className="swiper-button-prev nav-btn"></div>
            <div className="swiper-pagination"></div>
        </section>
    );
}

export default Header;