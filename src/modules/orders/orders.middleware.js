import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { OrderService } from "./orders.service.js";

export const validateExistOrder = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const order = await OrderService.findOne(id);

    if (!order) {
        return next(new AppError(`Order with id: ${id} not found`, 404));
    }

    req.order = order;
    req.user = order.user
    next();
});