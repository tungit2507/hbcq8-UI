import React, { useState, useEffect } from 'react';
import { CPagination, CPaginationItem } from '@coreui/react'; // Import các thành phần từ CoreUI
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS

const BlogList = () => {
    // Danh sách các bài viết
    const blogs = [
        {
            id: 1,
            title: "Dolorum optio tempore voluptas dignissimos",
            date: "12 December",
            author: "John Doe",
            category: "Politics",
            image: "assets/img/blog/blog-1.jpg",
        },
        {
            id: 2,
            title: "Nisi magni odit consequatur autem nulla dolorem",
            date: "19 March",
            author: "Julia Parker",
            category: "Economics",
            image: "assets/img/blog/blog-2.jpg",
        },
        {
            id: 3,
            title: "Possimus soluta ut id suscipit ea ut. In quo quia et soluta libero sit sint.",
            date: "24 June",
            author: "Maria Doe",
            category: "Sports",
            image: "assets/img/blog/blog-3.jpg",
        },
        {
            id: 4,
            title: "Non rem rerum nam cum quo minus explicabo eius exercitationem.",
            date: "05 August",
            author: "Maria Doe",
            category: "Sports",
            image: "assets/img/blog/blog-4.jpg",
        },
        {
            id: 5,
            title: "Accusamus quaerat aliquam qui debitis facilis consequatur",
            date: "17 September",
            author: "John Parker",
            category: "Politics",
            image: "assets/img/blog/blog-5.jpg",
        },
        {
            id: 6,
            title: "Distinctio provident quibusdam numquam aperiam aut",
            date: "07 December",
            author: "Julia White",
            category: "Economics",
            image: "assets/img/blog/blog-1.jpg",
        },
        // Thêm 12 bài viết nữa
        {
            id: 7,
            title: "Bài viết thứ 7",
            date: "01 January",
            author: "Author 1",
            category: "Category 1",
            image: "assets/img/blog/blog-1.jpg",
        },
        {
            id: 8,
            title: "Bài viết thứ 8",
            date: "02 February",
            author: "Author 2",
            category: "Category 2",
            image: "assets/img/blog/blog-1.jpg",
        },
        {
            id: 9,
            title: "Bài viết thứ 9",
            date: "03 March",
            author: "Author 3",
            category: "Category 3",
            image: "assets/img/blog/blog-1.jpg",
        },
        {
            id: 10,
            title: "Bài viết thứ 10",
            date: "04 April",
            author: "Author 4",
            category: "Category 4",
            image: "assets/img/blog/blog-1.jpg",
        },
        {
            id: 11,
            title: "Bài viết thứ 11",
            date: "05 May",
            author: "Author 5",
            category: "Category 5",
            image: "assets/img/blog/blog-1.jpg",
        },
        {
            id: 12,
            title: "Bài viết thứ 12",
            date: "06 June",
            author: "Author 6",
            category: "Category 6",
            image: "assets/img/blog/blog-1.jpg",
        },
        {
            id: 13,
            title: "Bài viết thứ 13",
            date: "07 July",
            author: "Author 7",
            category: "Category 7",
            image: "assets/img/blog/blog-1.jpg",
        },
        {
            id: 14,
            title: "Bài viết thứ 14",
            date: "08 August",
            author: "Author 8",
            category: "Category 8",
            image: "assets/img/blog/blog-1.jpg",
        },
        {
            id: 15,
            title: "Bài viết thứ 15",
            date: "09 September",
            author: "Author 9",
            category: "Category 9",
            image: "assets/img/blog/blog-1.jpg",
        },
        {
            id: 16,
            title: "Bài viết thứ 16",
            date: "10 October",
            author: "Author 10",
            category: "Category 10",
            image: "assets/img/blog/blog-1.jpg",
        },
        {
            id: 17,
            title: "Bài viết thứ 17",
            date: "11 November",
            author: "Author 11",
            category: "Category 11",
            image: "assets/img/blog/blog-1.jpg",
        },
        {
            id: 18,
            title: "Bài viết thứ 18",
            date: "12 December",
            author: "Author 12",
            category: "Category 12",
            image: "assets/img/blog/blog-1.jpg",
        }
    ];

    // Số bài viết trên mỗi trang
    const postsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    // Tính toán số trang
    const totalPages = Math.ceil(blogs.length / postsPerPage);

    // Lấy các bài viết cho trang hiện tại
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

    // Hàm để chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    return (
        <section id="blog-posts-2" className="blog-posts-2 section">
            <div className="container">
                <div className="row gy-4">
                    {currentPosts.map(blog => (
                        <div className="col-lg-4" key={blog.id} data-aos="fade-up">
                            <article className="position-relative h-100">
                                <div className="post-img position-relative overflow-hidden">
                                    <img src={blog.image} className="img-fluid" alt="" />
                                </div>
                                <div className="meta d-flex align-items-end">
                                    <span className="post-date"><span>{blog.date}</span></span>
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-person"></i> <span className="ps-2">{blog.author}</span>
                                    </div>
                                    <span className="px-3 text-black-50">/</span>
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-folder2"></i> <span className="ps-2">{blog.category}</span>
                                    </div>
                                </div>
                                <div className="post-content d-flex flex-column">
                                    <h3 className="post-title">{blog.title}</h3>
                                    <a href={`blog-detail?id=${blog.id}`} className="readmore stretched-link"><span>Read More</span><i className="bi bi-arrow-right"></i></a>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
                <div className="pagination d-flex justify-content-center pt-3">
                    <CPagination activePage={currentPage} pages={totalPages} onActivePageChange={paginate}>
                        <CPaginationItem disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>Trước</CPaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                            <CPaginationItem key={index} active={currentPage === index + 1} onClick={() => paginate(index + 1)}>{index + 1}</CPaginationItem>
                        ))}
                        <CPaginationItem disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}>Sau</CPaginationItem>
                    </CPagination>
                </div>
            </div>
        </section>
    );
};

export default BlogList;