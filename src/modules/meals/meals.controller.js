import { catchAsync } from "../../common/errors/catchAsync.js";
import { validateMeal, validateUpdateMeal } from "./meals.schema.js";
import { MealService } from "./meals.service.js";

export const findAllMeals = catchAsync(async (req, res, next) => {
    const meals = await MealService.findAll();

    return res.status(200).json(meals);
});

export const findOneMeal = catchAsync(async (req, res) => {
    const { meal } = req;

    return res.status(200).json(meal);
});

export const createMeal = catchAsync(async (req, res, next) => {
    const {id} = req.params;

    const { hasError, errorMessage, mealData } = validateMeal(
        req.body
    );

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessage,
        });
    }

    const meal = await MealService.createMeal({
        name:mealData.name,
        price: mealData.price,
        restaurantId: id
    });

    return res.status(201).json({
        id: meal.id,
        name: meal.name,
        price: meal.price,
        restaurantId: meal.restaurantId,
    });
});

export const updateMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;

    const { hasError, errorMessage, mealData } = validateUpdateMeal(
        req.body
    );

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessage,
        });
    }

    const mealUpdate = await MealService.updateMeal(
        meal,
        mealData
    );

    return res.status(200).json(mealUpdate);
});

export const deleteMeal = catchAsync(async (req, res) => {
    const { meal } = req;

    await MealService.deleteMeal(meal);

    return res.status(204).json(null);
});
