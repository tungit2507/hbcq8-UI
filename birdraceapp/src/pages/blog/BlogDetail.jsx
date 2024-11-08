import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axioInstance from '../../apiInstance';
import { render } from 'react-dom';

const BlogDetail = () => {
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const slug = window.location.pathname.split('/').pop(); // Lấy slug từ URL
        axioInstance.get(`/post/${slug}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                setError(error.response ? error.response.data.message : error.message);
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!post) {
        return <div>Bài Viết Không Tồn Tại</div>;
    }

    return (
        <div className='container'>
            <div class="row">
                <div class="col-lg-12">
                <section id="blog-details" class="blog-details section">
                    <div class="container">
                        <article class="article">
                            <h2 class="title">{post.title}</h2>
                            <div class="content">
                                <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                            </div>
                        </article>
                    </div>
                </section>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
