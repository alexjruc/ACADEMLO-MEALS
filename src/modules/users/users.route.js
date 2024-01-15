import express from 'express';
import { register, deleteUser, findUserOrders, findOneOrder, login, updateUser } from './users.controller.js';
import { protect, protectAccountOwner, validateExistOrderByUser, validateExistUser } from './users.middleware.js';

export const router = express.Router();

router.post('/register', register)

router.post('/login', login)

router.use(protect)

router.get('/orders', findUserOrders)
router.get('/orders/:id',validateExistOrderByUser, findOneOrder)

router
  .route('/:id')
  .patch(validateExistUser,protectAccountOwner, updateUser)
  .delete(validateExistUser,protectAccountOwner, deleteUser);


  