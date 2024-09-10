import mongoose from "mongoose";

const SubscriptionPlanSchema = new mongoose.Schema({
    planName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    planType: {
        type: String,
        required: true,
        enum: ['STANDARD', 'PRO', 'PREMIUM',]
    }
});


const subscriptionPlanModel = (connection) => {
    return connection.model('subscription_plan', SubscriptionPlanSchema);
};
export {
    subscriptionPlanModel,
};
