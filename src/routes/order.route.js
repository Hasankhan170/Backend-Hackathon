import express from 'express';
import { orderCreate } from '../controllers/order.controllers.js';
import authenticateUser from "../middleware/auth.middleware.js"
const router = express.Router()

router.post("/orders",authenticateUser,orderCreate)

export default router;