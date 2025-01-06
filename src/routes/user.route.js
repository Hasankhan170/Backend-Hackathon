import express from "express";
import { register,login,logout ,refresh} from "../controllers/user.controllers.js";
import authenticateUser from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.post("/logout",authenticateUser,logout)
router.post("/refresh",refresh)




export default router;