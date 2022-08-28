const { Comment } = require('../../models');
const router = require('express').Router();



router.post('/comment/', async (req, res) => {
    try {
        console.log('hey')

        console.log(req)
        const dbCommentData = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            post_id: req.body.postId
        });

        res.status(200).json(dbCommentData);

      
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router