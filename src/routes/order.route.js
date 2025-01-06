import express from 'express';
import { orderCreate,orderList,singleOrder } from '../controllers/order.controllers.js';
import authenticateUser from "../middleware/auth.middleware.js"
const router = express.Router()

router.post("/orders",authenticateUser,orderCreate)
router.get("/orders",authenticateUser,orderList)
router.get("/orders/:id",authenticateUser,singleOrder)



export default router;