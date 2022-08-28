const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/withAuth");
const router = require('express').Router();

router.get('/', async (req, res, next) => {

    // Make post to test this
    const posts = await Post.findAll({
        include:[
            {model: User, attributes: ['username']}
        ],
        raw: true,
        nest: true
    })

    res.render('homepage', {
        posts
    })
})


router.get('/newpost', (req, res, next) => {
    res.render('create-post')
})

router.get('/post/:id', async (req, res, next)=> {
    const dbPostData = await Post.findByPk(req.params.id, {
        include:[
            {model: Comment,
                include:[{model: User,
                    attributes: ['username']}]
            },
            
            {model: User, attributes: ['username']}
        ],
        nest: true
    })

    const post = dbPostData.get({ plain: true })



    res.render('individual-post', {
        post
    })
})

// Renders the edit page, passing the data so the previous post can still be seen
router.get('/edit/:id', withAuth, async (req, res, next)=> {
    try {
        const post = await Post.findByPk(req.params.id,{
            raw:true,
            nest: true
        }) 

        console.log(post)
        
        res.render('edit-post', {
            post
        })
        
    } catch (error) {
        console.log(error)
    }
    
}) 

// Renders the login page
router.get('/login', (req, res, next) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('log-in');
})

// Renders the register page
router.get('/register', (req, res, next)=> {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('sign-up');
})

module.exports = router