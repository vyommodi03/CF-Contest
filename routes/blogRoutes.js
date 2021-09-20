const { Router } = require("express");
const blogController = require("../controller/blogController");
const router = Router();

router.get("/create",blogController.getCreateBlog);
router.post('/create',blogController.postCreateBlog);
router.get('/', blogController.getBlogs);
router.get('/:id',blogController.getBlogDetail);
router.delete('/:id',blogController.deleteBlog);


module.exports = router;
