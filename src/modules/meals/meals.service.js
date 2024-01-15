import Meal from "./meals.model.js";
import Restaurant from "../restaurants/restaurants.model.js";

export class MealService {
    static async findOne(id) {
        return await Meal.findOne({
            where: {
                id: id,
                status: true,
            },
            include: [
                {
                    model: Restaurant
                }
            ]
        });
    }

    static async findAll() {
        return await Meal.findAll({
            attributes: {
                exclude: ["status", "createdAt", "updatedAt"],
            },
            where: {
                status: true,
            },
            include: [
                {
                    model: Restaurant
                }
            ]
        });
    }

    static async createMeal(data) {
        return await Meal.create(data);
    }

    static async updateMeal(meal, data) {
        return await meal.update(data);
    }

    static async deleteMeal(meal) {
        return await meal.update({ status: false });
    }
}