import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, updatePost, getPostById, deletePost } from '../../services/api';
import './BlogForm.css';

const BlogForm = ({ refreshPosts }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the fields when no `id` (i.e., "Create Post")
        if (!id) {
            setTitle('');
            setText('');
            return;
        }

        // Load post details when `id` exists (i.e., "Edit Post")
        (async () => {
            const response = await getPostById(id);
            setTitle(response.data.response.title);
            setText(response.data.response.text);
        })();
    }, [id]); // Run effect whenever `id` changes

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updatePost(id, { title, text });
        } else {
            await createPost({ title, text });
        }
        refreshPosts();
        navigate('/');
    };

    const handleDelete = async () => {
        if (id) {
            await deletePost(id);
            refreshPosts();
            navigate('/');
        }
    };

    return (
        <div className="post-form">
            <h1>{id ? 'Edit Post' : 'Create Post'}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Text:
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    ></textarea>
                </label>
                <div className="form-actions">
                    <button type="submit" className="button save">
                        Save
                    </button>
                    {id && (
                        <button type="button" onClick={handleDelete} className="button delete">
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default BlogForm;
