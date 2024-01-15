import express from "express";
import { protect, restrictTo } from '../users/users.middleware.js'
import { validateExistMeal } from "./meals.middleware.js";
import { createMeal, deleteMeal, findAllMeals, findOneMeal, updateMeal } from "./meals.controller.js";


export const router = express.Router();

router.get("/", findAllMeals);
router.get("/:id", validateExistMeal, findOneMeal);

router.use(protect)

router.post("/:id",restrictTo('admin'), createMeal);

router
    .route("/:id")
    .patch(validateExistMeal, restrictTo('admin'), updateMeal)
    .delete(validateExistMeal, restrictTo('admin') , deleteMeal);