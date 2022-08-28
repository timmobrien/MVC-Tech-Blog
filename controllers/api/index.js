const router = require('express').Router();

const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes')

const postRoutes = require('./post-routes')

router.use(userRoutes);
router.use(postRoutes);
router.use(commentRoutes)

module.exports = router;