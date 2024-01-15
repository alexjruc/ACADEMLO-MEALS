import z from "zod";
import { extractValidationData } from "../../common/utils/extractErrorData.js";

const createSchemaRestaurants = z.object({
    name: z
        .string({
            invalid_type_error: "Name must be a correct format!",
            required_error: "Name is required!",
        })
        .min(2, { message: "Name is too short" })
        .max(50, { message: "Name is too long" }),

    address: z
        .string({
            invalid_type_error: "Address must be a correct format!",
            required_error: "Address is required!",
        })
        .min(2, { message: "Address is too short" })
        .max(100, { message: "Address is too long" }),

    rating: z.number(),
});

const updateSchemaRestaurants = z.object({
    name: z
        .string({
            invalid_type_error: "Name must be a correct format!",
            required_error: "Name is required!",
        })
        .min(2, { message: "Name is too short" })
        .max(50, { message: "Name is too long" }),

    address: z
        .string({
            invalid_type_error: "Address must be a correct format!",
            required_error: "Address is required!",
        })
        .min(2, { message: "Address is too short" })
        .max(100, { message: "Address is too long" }),
});

const createSchemaReviews = z.object({
    comment: z
        .string({
            invalid_type_error: "Comment must be a correct format!",
            required_error: "Comment is required!",
        })
        .min(10, { message: "Comment is too short" })
        .max(150, { message: "Comment is too long" }),

    rating: z.number(),
});

const updateSchemaReviews = z.object({
    comment: z
        .string({
            invalid_type_error: "Comment must be a correct format!",
            required_error: "Comment is required!",
        })
        .min(10, { message: "Comment is too short" })
        .max(150, { message: "Comment is too long" }),

    rating: z.number(),
});

export function validateRestaurant(data) {
    const result = createSchemaRestaurants.safeParse(data);

    const {
        hasError,
        errorMessage,
        data: restaurantData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessage,
        restaurantData,
    };
}

export function validateUpdateRestaurant(data) {
    const result = updateSchemaRestaurants.safeParse(data);

    const {
        hasError,
        errorMessage,
        data: restaurantData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessage,
        restaurantData,
    };
}

export function validateReview(data) {
    const result = createSchemaReviews.safeParse(data);

    const {
        hasError,
        errorMessage,
        data: reviewData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessage,
        reviewData,
    };
}

export function validateUpdateReview(data) {
    const result = updateSchemaReviews.safeParse(data);

    const {
        hasError,
        errorMessage,
        data: reviewData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessage,
        reviewData,
    };
}
