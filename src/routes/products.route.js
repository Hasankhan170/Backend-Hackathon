import express from 'express';
import { createPost, singleUserPost,getAllUsers,deleteSinglePost,editSinglePost } from '../controllers/product.controllers.js';
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();

router.post("/createPost/:userId", upload.single("image"),createPost);
router.get("/singleUserPost/:userId",singleUserPost)
router.delete("/deletePost/:userId/:productId",deleteSinglePost)
router.put("/editPost/:userId/:productId",editSinglePost)

router.get("/getAllUsers",getAllUsers)
// router.post("/payment",ProductPayment);




export default router;