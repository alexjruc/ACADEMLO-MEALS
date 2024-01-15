import express from 'express';
import { router as usersRoute } from '../modules/users/users.route.js';
import { router as mealsRoute } from '../modules/meals/meals.route.js';
import { router as restaurantsRoute } from '../modules/restaurants/restaurants.route.js';
import { router as ordersRoute } from '../modules/orders/orders.route.js';

export const router = express.Router();

router.use('/users', usersRoute)
router.use('/meals', mealsRoute)
router.use('/restaurants', restaurantsRoute)
router.use('/orders', ordersRoute)
