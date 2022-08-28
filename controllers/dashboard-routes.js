const { raw } = require('express');
const { Post, User , Comment } = require('../models');

const router = require('express').Router();

router.get('/dashboard', async (req, res, next) => {
    const userPosts = await Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        raw: true,
        nest: true
    })

    res.render('dashboard',{
        userPosts
    })
})


module.exports = router;