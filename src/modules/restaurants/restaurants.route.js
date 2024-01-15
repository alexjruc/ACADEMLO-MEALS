import express from "express";
import { createRestaurant, createReview, deleteRestaurant, deleteReview, findAllRestaurants, findOneRestaurant, updateRestaurant, updateReview } from "./restaurants.controller.js";
import { protect, protectAccountOwner, restrictTo } from '../users/users.middleware.js'
import { validateExistRestaurant, validateExistReview } from "./restaurants.middleware.js";

export const router = express.Router();

router.get("/", findAllRestaurants);
router.get("/:id", validateExistRestaurant, findOneRestaurant);

router.use(protect)

router.post("/",restrictTo('admin'), createRestaurant);

router
    .route("/:id")
    .patch(validateExistRestaurant, restrictTo('admin'), updateRestaurant)
    .delete(validateExistRestaurant, restrictTo('admin') , deleteRestaurant);

router
    .post("/reviews/:id", validateExistRestaurant, createReview)
    .patch("/reviews/:restaurantId/:id",validateExistRestaurant, validateExistReview, protectAccountOwner, updateReview)
    .delete("/reviews/:restaurantId/:id",validateExistRestaurant, validateExistReview, protectAccountOwner, deleteReview)