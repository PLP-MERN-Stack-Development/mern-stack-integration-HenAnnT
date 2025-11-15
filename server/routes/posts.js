const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // unique filename
    }
});
const upload = multer({ storage });

// Create post with optional image
router.post('/', authMiddleware, upload.single('featuredImage'), async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const post = new Post({
            title,
            content,
            category,
            author: req.user._id,
            featuredImage: req.file ? req.file.filename : 'default-post.jpg'
        });
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /posts?page=1&limit=10&category=xyz
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const posts = await Post.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('author', 'username')
        .populate('category', 'name')
        .sort({ createdAt: -1 });

    const total = await Post.countDocuments(filter);

    res.json({ posts, total });
});

// GET /posts/search?q=term
router.get('/search', async (req, res) => {
    const query = req.query.q || '';
    const posts = await Post.find({ title: { $regex: query, $options: 'i' } });
    res.json({ posts });
});


module.exports = router;