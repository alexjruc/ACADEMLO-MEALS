import express from 'express';
import { validateExistOrder } from "./orders.middleware.js";
import { protect, protectAccountOwner } from '../users/users.middleware.js'
import { createOrder, deleteOrder, findAllOrders, updateOrder } from './orders.controller.js';


export const router = express.Router();

router.use(protect)

router.post("/", createOrder);
router.get("/me", findAllOrders);

router
    .route("/:id")
    .patch(validateExistOrder, protectAccountOwner, updateOrder)
    .delete(validateExistOrder, protectAccountOwner, deleteOrder);