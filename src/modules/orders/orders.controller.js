import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { MealService } from "../meals/meals.service.js";
import { validateOrder } from "./orders.schema.js";
import { OrderService } from "./orders.service.js";

export const findAllOrders = catchAsync(async (req, res, next) => {
    const orders = await OrderService.findAll();

    return res.status(200).json(orders);
});

export const createOrder = catchAsync(async (req, res, next) => {
    const {sessionUser} = req;

    const { hasError, errorMessage, orderData } = validateOrder(
        req.body
    );

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessage,
        });
    }

    const meal = await MealService.findOne(orderData.mealId);

    if (!meal) {
        return next(new AppError(`Meal with id: ${orderData.mealId} not found`, 404));
    }

    const order = await OrderService.createOrder({
        mealId:orderData.mealId,
        userId: sessionUser.id,
        quantity: orderData.quantity,
        totalPrice: orderData.quantity * meal.price
    });

    return res.status(201).json({
        id: order.id,
        mealId: order.mealId,
        userId: order.userId,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
    });
});

export const updateOrder = catchAsync(async (req, res, next) => {
    const { order } = req;

    const orderUpdate = await OrderService.updateOrder(order);

    return res.status(200).json(orderUpdate);
});

export const deleteOrder = catchAsync(async (req, res) => {
    const { order } = req;

    await OrderService.deleteOrder(order);

    return res.status(204).json(null);
});
