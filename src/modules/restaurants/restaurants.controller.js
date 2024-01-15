import { catchAsync } from "../../common/errors/catchAsync.js";
import {
    validateRestaurant,
    validateReview,
    validateUpdateRestaurant,
    validateUpdateReview,
} from "./restaurants.schema.js";
import { RestaurantService } from "./restaurants.service.js";

export const findAllRestaurants = catchAsync(async (req, res, next) => {
    const restaurants = await RestaurantService.findAll();

    return res.status(200).json(restaurants);
});

export const findOneRestaurant = catchAsync(async (req, res) => {
    const { restaurant } = req;

    return res.status(200).json(restaurant);
});

export const createRestaurant = catchAsync(async (req, res, next) => {
    const { hasError, errorMessage, restaurantData } = validateRestaurant(
        req.body
    );

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessage,
        });
    }

    const restaurant = await RestaurantService.create(restaurantData);

    return res.status(201).json({
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        rating: restaurant.rating,
    });
});

export const updateRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;

    const { hasError, errorMessage, restaurantData } = validateUpdateRestaurant(
        req.body
    );

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessage,
        });
    }

    const restaurantUpdate = await RestaurantService.update(
        restaurant,
        restaurantData
    );

    return res.status(200).json(restaurantUpdate);
});

export const deleteRestaurant = catchAsync(async (req, res) => {
    const { restaurant } = req;

    await RestaurantService.delete(restaurant);

    return res.status(204).json(null);
});

export const createReview = catchAsync(async (req, res, next) => {
    const {sessionUser} = req
    const {restaurant} = req
    const { hasError, errorMessage, reviewData } = validateReview(req.body);

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessage,
        });
    }

    const review = await RestaurantService.createReview({
        comment:reviewData.comment,
        rating : reviewData.rating,
        userId: sessionUser.id,
        restaurantId:restaurant.id
    });

    return res.status(201).json(review);
});

export const updateReview = catchAsync(async (req, res, next) => {
    const { review } = req;

    const { hasError, errorMessage, reviewData } = validateUpdateReview(req.body);

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessage,
        });
    }

    const reviewUpdated = await RestaurantService.updateReview(review, reviewData)

    return res.status(200).json(reviewUpdated);
});

export const deleteReview = catchAsync(async (req, res, next) => {
    const { review } = req;

    await RestaurantService.deleteReview(review);

    return res.status(204).json(null);
});
