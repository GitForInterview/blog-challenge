import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import './styles.css';
import {getAllPosts, generateSampleData} from './services/api';
import BlogList from './components/BlogList/BlogList';
import BlogForm from './components/BlogForm/BlogForm';
import BlogPost from './components/BlogPost/BlogPost';
import Header from './components/Header/Header';

const App = () => {
    const [posts, setPosts] = useState([]);

    const loadPosts = async () => {
        try {
            const response = await getAllPosts();
            setPosts(response.data.response);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const loadSampleData = async () => {
        await generateSampleData();
        loadPosts();
    };

    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <Router>
            <Header loadSampleData={loadSampleData}/>
            <Routes>
                <Route
                    path="/"
                    element={<BlogList posts={posts} refreshPosts={loadPosts}/>}
                />
                <Route
                    path="/create"
                    element={<BlogForm refreshPosts={loadPosts}/>}
                />
                <Route
                    path="/edit/:id"
                    element={<BlogForm refreshPosts={loadPosts}/>}
                />
                <Route
                    path="/post/:id"
                    element={<BlogPost refreshPosts={loadPosts}/>}
                />
            </Routes>
        </Router>
    );
};

export default App;

