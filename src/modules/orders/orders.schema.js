import z from "zod";
import { extractValidationData } from "../../common/utils/extractErrorData.js";

const createSchemaOrders = z.object({
    mealId: z.number(),
    quantity: z.number(),
});

export function validateOrder(data) {
    const result = createSchemaOrders.safeParse(data);

    const {
        hasError,
        errorMessage,
        data: orderData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessage,
        orderData,
    };
}
