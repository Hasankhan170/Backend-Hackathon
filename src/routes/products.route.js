import express from 'express';
import { createPost, singleUserPost,getAllProducts,deleteSinglePost,editSinglePost } from '../controllers/product.controllers.js';
import { upload } from "../middleware/multer.middleware.js";
import authenticateUser from "../middleware/auth.middleware.js"

const router = express.Router();


router.post("/products", authenticateUser,upload.single("image"), createPost);
router.get("/products",getAllProducts)
router.get("/products/:id",singleUserPost)
router.delete("/products/:id",authenticateUser,deleteSinglePost)
router.put("/products/:id",editSinglePost)
// router.post("/payment",ProductPayment);




export default router;