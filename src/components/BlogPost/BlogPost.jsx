import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../../services/api';
import { sanitizeHTML } from '../../services/htmlService';
import './BlogPost.css';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await getPostById(id);
            setPost(response.data.response);
        })();
    }, [id]);

    return post ? (
        <div className="post-details">
            <h1>{post.title}</h1>
            <div
                className="post-content"
                dangerouslySetInnerHTML={{
                    __html: sanitizeHTML(post.text),
                }}
            ></div>
            <div className="post-footer">
                <p>
                    <i>{new Date(post.timestamp).toLocaleString()}</i>
                </p>
                <Link to={`/edit/${post.id}`} className="edit-link">
                    Edit
                </Link>
            </div>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default BlogPost;
