import { useState, useEffect } from 'react';
import { postService, categoryService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [featuredImage, setFeaturedImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        categoryService.getAllCategories().then(setCategories);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        if (featuredImage) formData.append('featuredImage', featuredImage);

        await postService.createPost(formData); // only one request
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={e => setFeaturedImage(e.target.files[0])} />
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required />
            <select value={category} onChange={e => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                {categories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                ))}
            </select>
            <button type="submit">Create Post</button>
        </form>
    );
};

export default PostForm;