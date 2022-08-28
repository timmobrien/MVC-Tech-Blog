const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/withAuth");
const router = require('express').Router();

// Fetches all posts from the database and passes them to the view
router.get('/', async (req, res, next) => {

    const posts = await Post.findAll({
        include:[
            {model: User, attributes: ['username']}
        ],
        raw: true,
        nest: true,
        order: [['created_at', 'DESC']]
    })

    res.render('homepage', {
        posts
    })
})

// Renders the page to create a post
router.get('/newpost', (req, res, next) => {
    res.render('create-post')
})

// Gets the data for a specific post
router.get('/post/:id', async (req, res, next)=> {
    const dbPostData = await Post.findByPk(req.params.id, {
        // Include associated data
        include:[
            {model: Comment,
                include:[{model: User,
                    attributes: ['username']}]
            },
            
            {model: User, attributes: ['username']}
        ],
        nest: true
    })
    // Format data
    const post = dbPostData.get({ plain: true })


    // Render the data to the view
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