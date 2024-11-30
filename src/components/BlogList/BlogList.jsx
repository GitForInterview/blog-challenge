import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {deletePost} from '../../services/api';
import {sanitizeHTML} from '../../services/htmlService';
import './BlogList.css';

const BlogList = ({posts, refreshPosts}) => {
    const [sortedPosts, setSortedPosts] = useState([]); // State to store sorted posts
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        await deletePost(id);
        refreshPosts();
    };

    // Sort posts and store them in state
    useEffect(() => {
        if (posts.length > 0) {
            const sorted = [...posts].sort(
                (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
            );
            setSortedPosts(sorted);
        }
    }, [posts]); // Recalculate sortedPosts only when `posts` changes

    return (
        <div className="container">
            <div className="sidebar">
                <h2>Past Posts</h2>
                <ul>
                    {sortedPosts.map((post) => (
                        <li key={post.id}>
                            <Link to={`/post/${post.id}`}>
                                {new Date(post.timestamp).toLocaleDateString('en-US', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                })} - {post.title}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="new-post">
                    <Link to="/create">(Create New Post)</Link>
                </div>
            </div>
            <div className="main-content">
                {sortedPosts.map((post) => (
                    <div
                        className="post"
                        key={post.id}
                        onClick={() => navigate(`/post/${post.id}`)} // Make entire post clickable
                        style={{cursor: 'pointer'}}
                    >
                        <h2>
                            {post.title}
                            <span>
                {new Date(post.timestamp).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                })}
              </span>
                        </h2>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHTML(
                                    post.text.length > 1500
                                        ? post.text.substring(0, 1500) + '...'
                                        : post.text
                                ),
                            }}
                        ></div>
                        <div className="actions">
                            <Link to={`/edit/${post.id}`} onClick={(e) => e.stopPropagation()}>
                                Edit
                            </Link>
                            <a
                                className="delete"
                                href="#"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(post.id);
                                }}
                            >
                                Delete
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
