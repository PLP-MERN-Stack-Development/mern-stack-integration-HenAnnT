import { useState } from 'react';
import { postService } from '../services/api';

const CommentList = ({ comments, postId }) => {
    const [newComment, setNewComment] = useState('');
    const [commentList, setCommentList] = useState(comments);

    const addComment = async (e) => {
        e.preventDefault();
        if (!newComment) return;

        const updatedPost = await postService.addComment(postId, { content: newComment });
        setCommentList(updatedPost.comments);
        setNewComment('');
    };

    return (
        <div>
            <h3>Comments</h3>
            {commentList.map(c => (
                <p key={c._id}><b>{c.user?.username || 'User'}:</b> {c.content}</p>
            ))}
            <form onSubmit={addComment}>
                <input
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                />
                <button type="submit">Post</button>
            </form>
        </div>
    );
};

export default CommentList;
