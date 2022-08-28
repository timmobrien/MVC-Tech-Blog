const { Post } = require('../../models');

const router = require('express').Router();

router.post('/post/', async (req, res) => {
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

router.put('/update/:id', (req, res, next) => {
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

router.delete("/delete/:id", async (req, res)=> {
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