import Meal from "../meals/meals.model.js";
import Restaurant from "../restaurants/restaurants.model.js";
import User from "../users/users.model.js";
import Order from "./orders.model.js";

export class OrderService {
    static async findOne(id) {
        return await Order.findOne({
            where: {
                id: id,
                status: "active",
            },
            include: [
                {
                    model: User,
                },

                {
                    model: Meal,
                    include: [
                        {
                            model: Restaurant,
                        },
                    ],
                },
            ],
        });
    }

    static async findAll() {
        return await Order.findAll({
            attributes: {
                exclude: ["status", "createdAt", "updatedAt"],
            },
            where: {
                status: "active",
            },
            include: [
                {
                    model: Meal,
                    include: [
                        {
                            model: Restaurant,
                        },
                    ],
                },
            ],
        });
    }

    static async findOrdersByUser(id) {
        return await Order.findAll({
            where: {
                status: "active",
                userId: id,
            },
            include: [
                {
                    model: Meal,
                    include: [
                        {
                            model: Restaurant,
                        },
                    ],
                },
                {
                    model: User,
                },
            ],
        });
    }

    static async createOrder(data) {
        return await Order.create(data);
    }

    static async updateOrder(order) {
        return await order.update({ status: "completed" });
    }

    static async deleteOrder(order) {
        return await order.update({ status: "cancelled" });
    }
}
