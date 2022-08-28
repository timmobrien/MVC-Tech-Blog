const { Post } = require('../../models');
const withAuth = require('../../utils/withAuth');

const router = require('express').Router();

// Post route for new blog post
router.post('/post/', withAuth, async (req, res) => {
    try {

        console.log(req.session.user_id)

        const dbPostData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });

        res.status(200).json(dbPostData);

      
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Put route to edit an existing post
router.put('/update/:id', withAuth, (req, res, next) => {
    Post.update(
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }        
    )
})

// Delete route to remove an existing post
router.delete("/delete/:id", withAuth, async (req, res)=> {
    try {
        const destroyedData = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        
        console.log(destroyedData)

        if(!destroyedData) {
            res.status(404).json({
                message: "No post found with this id"
            })
            return;
        } 

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

})

module.exports = router