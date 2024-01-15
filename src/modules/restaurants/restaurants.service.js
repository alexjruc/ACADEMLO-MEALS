import User from "../users/users.model.js";
import Restaurant from "./restaurants.model.js";
import Review from "./reviews.model.js";

export class RestaurantService {
    static async findOne(id) {
        return await Restaurant.findOne({
            where: {
                id: id,
                status: "active",
            },
        });
    }

    static async findAll() {
        return await Restaurant.findAll({
            attributes: {
                exclude: ["status", "createdAt", "updatedAt"],
            },
            where: {
                status: "active",
            },
        });
    }

    static async create(data) {
        return await Restaurant.create(data);
    }

    static async update(restaurant, data) {
        return await restaurant.update(data);
    }

    static async delete(restaurant) {
        return await restaurant.update({ status: "inactive" });
    }

    static async createReview(data) {
        return await Review.create(data);
    }

    static async findOneReview(id) {
        return await Review.findOne({
            where:{
                id:id,
                status:'active',
            },
            include: [
                {
                    model: User
                }
            ]
        });
    }

    static async updateReview(restaurant, data) {
        return await restaurant.update(data);
    }

    static async deleteReview(restaurant) {
        return await restaurant.update({ status: "deleted" });
    }

}
