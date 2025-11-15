import { useEffect, useState } from 'react';
import { postService } from '../services/api';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setLoading(true);
        postService.getAllPosts(page)
            .then(data => {
                setPosts(data.posts);
                setTotal(data.total);
            })
            .finally(() => setLoading(false));
    }, [page]);

    if (loading) return <p>Loading posts...</p>;
    if (!posts.length) return <p>No posts found.</p>;

    return (
        <div>
            <h1>All Posts</h1>

            <SearchBar setPosts={setPosts} />

            {posts.map(post => (
                <Link key={post._id} to={`/posts/${post._id}`}>
                    <PostCard post={post} />
                </Link>
            ))}

            <Pagination page={page} total={total} limit={10} onPageChange={setPage} />
        </div>
    );
};

export default Home;