import { useState } from 'react';
import { postService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ setPosts }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;
        const data = await postService.searchPosts(query);
        setPosts(data.posts);
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                placeholder="Search posts..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
