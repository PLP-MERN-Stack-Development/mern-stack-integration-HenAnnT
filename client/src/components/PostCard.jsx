const PostCard = ({ post }) => {
    return (
        <div className="post-card">
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <small>Views: {post.viewCount}</small>
        </div>
    );
};

export default PostCard;
