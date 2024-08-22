import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
    personalInfo: {
        fullName: { type: String, index: true },
        gender: { type: String, enum: ['Male', 'Female', 'Other'], index: true },
        dateOfBirth: Date,
        height: Number,
        weight: Number,
        bodyType: { type: String, index: true },
        complexion: { type: String, index: true },
        physicalDisabilities: String
    },
    contactInfo: {
        phoneNumber: { type: String, select: false },
        emailAddress: { type: String, select: false },
        address: {
            country: { type: String, index: true },
            state: { type: String, index: true },
            city: { type: String, index: true }
        }
    },
    educationInfo: {
        educationLevel: { type: String, index: true },
        fieldOfStudy: { type: String, index: true },
        occupation: { type: String, index: true },
        annualIncome: Number,
        companyName: String,
        workLocation: { type: String, index: true }
    },
    familyInfo: {
        fatherName: String,
        motherName: String,
        fatherOccupation: { type: String, index: true },
        motherOccupation: { type: String, index: true },
        siblings: [{
            name: String,
            occupation: String,
            maritalStatus: String
        }]
    },
    religiousInfo: {
        religion: { type: String, index: true },
        caste: { type: String, index: true },
        subCaste: { type: String, index: true },
        motherTongue: { type: String, index: true },
        gothra: { type: String, index: true },
        nakshatra: { type: String, index: true },
        zodiacSign: { type: String, index: true }
    },
    lifestyleInfo: {
        diet: { type: String, enum: ['Vegetarian', 'Non-Vegetarian', 'Vegan'], index: true },
        smoking: { type: Boolean, index: true },
        drinking: { type: Boolean, index: true },
        hobbies: { type: [String], index: true },
        languagesKnown: { type: [String], index: true }
    },
    partnerPreferences: {
        ageRange: {
            min: Number,
            max: Number
        },
        heightRange: {
            min: Number,
            max: Number
        },
        religion: { type: String, index: true },
        caste: { type: String, index: true },
        education: { type: String, index: true },
        occupation: { type: String, index: true },
        location: {
            country: { type: String, index: true },
            state: { type: String, index: true },
            city: { type: String, index: true }
        },
        lifestylePreferences: {
            diet: { type: String, index: true },
            smoking: { type: Boolean, index: true },
            drinking: { type: Boolean, index: true }
        }
    },
    photos: {
        profilePicture: String,
        gallery: [String]
    },
    additionalInfo: {
        aboutMe: { type: String, index: 'text' },   // 
        expectations: { type: String, index: 'text' },
        customQuestions: Map
    }
});


const userProfileModel = (connection) => {
    return connection.model('user_profiles', userProfileSchema);
};
export {
    userProfileModel,
};
