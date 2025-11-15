const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');

// GET all categories
router.get('/', async (req, res, next) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);
    } catch (err) {
        next(err);
    }
});

// Create category (protected)
router.post('/', auth, async (req, res, next) => {
    try {
        const category = await Category.create({ name: req.body.name });
        res.status(201).json(category);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
