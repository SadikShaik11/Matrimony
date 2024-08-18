import mongoose from "mongoose";
const languageSchema = new mongoose.Schema({
    region: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    }
});

const LanguageModel = mongoose.model('languages', languageSchema);

export { LanguageModel } 
