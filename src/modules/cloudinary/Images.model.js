import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the Image schema
const imageSchema = new Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    imageType: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update the `updatedAt` field on document save
imageSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const imageModel = (connection) => {
    return connection.model('images', imageSchema);
};
export {
    imageModel,
};
