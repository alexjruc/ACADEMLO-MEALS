import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { envs } from "../../config/enviroments/enviroments.js";
import { OrderService } from "../orders/orders.service.js";
import { UserService } from "./users.service.js";
import jwt from "jsonwebtoken";

export const validateExistUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await UserService.findOne(id);

    if (!user) {
        return next(new AppError(`User with id: ${id} not found`, 404));
    }

    req.user = user;
    next();
});

export const validateExistOrderByUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { sessionUser } = req;

    const order = await OrderService.findOne(id);
    
    if (order.userId !== sessionUser.id) {
        return next(
            new AppError("You are not the owner of this account!", 401)
        );
    }

    if (!order) {
        return next(new AppError(`Order with id: ${id} not found`, 404));
    }

    req.order = order;
    next();
});

export const protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(
            new AppError("You are not logged in!, please login to access", 401)
        );
    }

    const decoded = jwt.verify(token, envs.SECRET_JWT_SEED);

    const user = await UserService.findOne(decoded.id);

    if (!user) {
        return next(
            new AppError("The owner of this token in not longer available", 401)
        );
    }

    req.sessionUser = user;
    next();
});

export const protectAccountOwner = catchAsync(async (req, res, next) => {
    const { user, sessionUser } = req;

    if (user.id !== sessionUser.id) {
        return next(
            new AppError("You are not the owner of this account!", 401)
        );
    }

    next();
});

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.sessionUser.role)) {
            return next(
                new AppError(
                    "You do not have permission to perfom this action.!",
                    403
                )
            );
        }

        next();
    };
};
