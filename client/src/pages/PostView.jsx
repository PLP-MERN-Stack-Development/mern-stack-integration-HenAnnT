import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postService } from '../services/api';
import CommentList from '../components/CommentList';

const PostView = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        postService.getPost(id)
            .then(data => setPost(data))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Loading post...</p>;
    if (!post) return <p>Post not found.</p>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <CommentList comments={post.comments} postId={post._id} />
        </div>
    );
};

export default PostView;
