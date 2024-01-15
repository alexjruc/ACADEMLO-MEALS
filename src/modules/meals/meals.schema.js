import z from "zod";
import { extractValidationData } from "../../common/utils/extractErrorData.js";

const createSchemaMeals = z.object({
    name: z
        .string({
            invalid_type_error: "Name must be a correct format!",
            required_error: "Name is required!",
        })
        .min(2, { message: "Name is too short" })
        .max(50, { message: "Name is too long" }),

    price: z.number(),
});

const updateSchemaMeals = z.object({
    name: z
        .string({
            invalid_type_error: "Name must be a correct format!",
            required_error: "Name is required!",
        })
        .min(2, { message: "Name is too short" })
        .max(50, { message: "Name is too long" }),

    price: z.number(),
});

export function validateMeal(data) {
    const result = createSchemaMeals.safeParse(data);

    const {
        hasError,
        errorMessage,
        data: mealData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessage,
        mealData,
    };
}

export function validateUpdateMeal(data) {
    const result = updateSchemaMeals.safeParse(data);

    const {
        hasError,
        errorMessage,
        data: mealData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessage,
        mealData,
    };
}