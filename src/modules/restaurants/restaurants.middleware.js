import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { RestaurantService } from "./restaurants.service.js";

export const validateExistRestaurant = catchAsync(async (req, res, next) => {
    const { id, restaurantId} = req.params;

    let restId = restaurantId || id

    const restaurant = await RestaurantService.findOne(restId);

    if (!restaurant) {
        return next(new AppError(`restaurant with id: ${restId} not found`, 404));
    }

    req.restaurant = restaurant;
    next();
});

export const validateExistReview = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const review = await RestaurantService.findOneReview(id);

    if (!review) {
        return next(new AppError(`Review with id: ${id} not found`, 404));
    }

    req.review = review;
    req.user = review.user
    next();
});