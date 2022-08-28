const { Comment } = require('../../models');
const withAuth = require('../../utils/withAuth');
const router = require('express').Router();


// Post route to make a new comment
router.post('/comment/', withAuth, async (req, res) => {
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