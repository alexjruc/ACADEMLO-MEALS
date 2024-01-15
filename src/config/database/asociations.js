import Meal from "../../modules/meals/meals.model.js";
import Order from "../../modules/orders/orders.model.js";
import Restaurant from "../../modules/restaurants/restaurants.model.js";
import Review from "../../modules/restaurants/reviews.model.js";
import User from "../../modules/users/users.model.js";

export const initModel = () => {
    User.hasMany(Order, {foreignKey: 'user_id'});
    Order.belongsTo(User, {foreignKey: 'user_id'})

    User.hasMany(Review)
    Review.belongsTo(User)

    Meal.hasOne(Order)
    Order.belongsTo(Meal)

    Restaurant.hasMany(Meal)
    Meal.belongsTo(Restaurant)

    Restaurant.hasMany(Review)
    Review.belongsTo(Restaurant)
}