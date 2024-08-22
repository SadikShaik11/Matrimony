import joi from 'joi';

/**
 * Create bride/groom profile validation schema
 */


const createUserProfileValidation = {
    body: joi.object().keys({
        personalInfo: joi.object({
            fullName: joi.string().min(2).max(100).optional(),
            gender: joi.string().valid('Male', 'Female', 'Other').optional(),
            dateOfBirth: joi.date().optional(),
            height: joi.number().min(100).max(250).optional(),
            weight: joi.number().min(30).max(200).optional(),
            bodyType: joi.string().optional(),
            complexion: joi.string().valid('Fair', 'Wheatish', 'Dark').optional(),
            physicalDisabilities: joi.string().optional().allow('')
        }).optional(),

        contactInfo: joi.object({
            phoneNumber: joi.string().regex(/^\d{10}$/).optional(),
            emailAddress: joi.string().email().optional(),
            address: joi.object({
                country: joi.string().optional().allow(''),
                state: joi.string().optional().allow(''),
                city: joi.string().optional().allow('')
            }).optional()
        }).optional(),

        educationInfo: joi.object({
            educationLevel: joi.string().optional(),
            fieldOfStudy: joi.string().optional(),
            occupation: joi.string().optional(),
            annualIncome: joi.number().optional(),
            companyName: joi.string().optional(),
            workLocation: joi.string().optional()
        }).optional(),

        familyInfo: joi.object({
            fatherName: joi.string().optional(),
            motherName: joi.string().optional(),
            fatherOccupation: joi.string().optional(),
            motherOccupation: joi.string().optional(),
            siblings: joi.array().items(
                joi.object({
                    name: joi.string().optional(),
                    occupation: joi.string().optional(),
                    maritalStatus: joi.string().valid('Single', 'Married', 'Divorced', 'Widowed').optional()
                })
            ).optional()
        }).optional(),

        religiousInfo: joi.object({
            religion: joi.string().optional(),
            caste: joi.string().optional().allow(''),
            subCaste: joi.string().optional().allow(''),
            motherTongue: joi.string().optional(),
            gothra: joi.string().optional().allow(''),
            nakshatra: joi.string().optional().allow(''),
            zodiacSign: joi.string().optional().allow('')
        }).optional(),

        lifestyleInfo: joi.object({
            diet: joi.string().valid('Vegetarian', 'Non-Vegetarian', 'Vegan').optional(),
            smoking: joi.boolean().optional(),
            drinking: joi.boolean().optional(),
            hobbies: joi.array().items(joi.string()).optional(),
            languagesKnown: joi.array().items(joi.string()).optional()
        }).optional(),

        partnerPreferences: joi.object({
            ageRange: joi.object({
                min: joi.number().optional(),
                max: joi.number().optional()
            }).optional(),
            heightRange: joi.object({
                min: joi.number().optional(),
                max: joi.number().optional()
            }).optional(),
            religion: joi.string().optional().allow(''),
            caste: joi.string().optional().allow(''),
            education: joi.string().optional().allow(''),
            occupation: joi.string().optional().allow(''),
            location: joi.object({
                country: joi.string().optional().allow(''),
                state: joi.string().optional().allow(''),
                city: joi.string().optional().allow('')
            }).optional(),
            lifestylePreferences: joi.object({
                diet: joi.string().valid('Vegetarian', 'Non-Vegetarian', 'Vegan').optional(),
                smoking: joi.boolean().optional(),
                drinking: joi.boolean().optional()
            }).optional()
        }).optional(),

        photos: joi.object({
            profilePicture: joi.string().uri().optional(),
            gallery: joi.array().items(joi.string().uri()).optional()
        }).optional(),

        additionalInfo: joi.object({
            aboutMe: joi.string().optional().max(500),
            expectations: joi.string().optional().max(500),
            customQuestions: joi.object().pattern(joi.string(), joi.any()).optional()
        }).optional(),

        isDeleted: joi.boolean().optional(),
        accountId: joi.string().optional(),
        regionId: joi.string().optional(),
        code: joi.string().optional()
    })
};



/**
 * Update bride/groom profile validation schema
 */
const updateUserProfileValidation = {
    body: joi.object().keys({
        personalInfo: joi.object({
            fullName: joi.string().min(2).max(100).optional(),
            gender: joi.string().valid('Male', 'Female', 'Other').optional(),
            dateOfBirth: joi.date().optional(),
            height: joi.number().min(100).max(250).optional(),
            weight: joi.number().min(30).max(200).optional(),
            bodyType: joi.string().optional(),
            complexion: joi.string().valid('Fair', 'Wheatish', 'Dark').optional(),
            physicalDisabilities: joi.string().optional().allow('')
        }).optional(),

        contactInfo: joi.object({
            phoneNumber: joi.string().regex(/^\d{10}$/).optional(),
            emailAddress: joi.string().email().optional(),
            address: joi.object({
                country: joi.string().optional().allow(''),
                state: joi.string().optional().allow(''),
                city: joi.string().optional().allow('')
            }).optional()
        }).optional(),

        educationInfo: joi.object({
            educationLevel: joi.string().optional(),
            fieldOfStudy: joi.string().optional(),
            occupation: joi.string().optional(),
            annualIncome: joi.number().optional(),
            companyName: joi.string().optional(),
            workLocation: joi.string().optional()
        }).optional(),

        familyInfo: joi.object({
            fatherName: joi.string().optional(),
            motherName: joi.string().optional(),
            fatherOccupation: joi.string().optional(),
            motherOccupation: joi.string().optional(),
            siblings: joi.array().items(
                joi.object({
                    name: joi.string().optional(),
                    occupation: joi.string().optional(),
                    maritalStatus: joi.string().valid('Single', 'Married', 'Divorced', 'Widowed').optional()
                })
            ).optional()
        }).optional(),

        religiousInfo: joi.object({
            religion: joi.string().optional(),
            caste: joi.string().optional().allow(''),
            subCaste: joi.string().optional().allow(''),
            motherTongue: joi.string().optional(),
            gothra: joi.string().optional().allow(''),
            nakshatra: joi.string().optional().allow(''),
            zodiacSign: joi.string().optional().allow('')
        }).optional(),

        lifestyleInfo: joi.object({
            diet: joi.string().valid('Vegetarian', 'Non-Vegetarian', 'Vegan').optional(),
            smoking: joi.boolean().optional(),
            drinking: joi.boolean().optional(),
            hobbies: joi.array().items(joi.string()).optional(),
            languagesKnown: joi.array().items(joi.string()).optional()
        }).optional(),

        partnerPreferences: joi.object({
            ageRange: joi.object({
                min: joi.number().optional(),
                max: joi.number().optional()
            }).optional(),
            heightRange: joi.object({
                min: joi.number().optional(),
                max: joi.number().optional()
            }).optional(),
            religion: joi.string().optional().allow(''),
            caste: joi.string().optional().allow(''),
            education: joi.string().optional().allow(''),
            occupation: joi.string().optional().allow(''),
            location: joi.object({
                country: joi.string().optional().allow(''),
                state: joi.string().optional().allow(''),
                city: joi.string().optional().allow('')
            }).optional(),
            lifestylePreferences: joi.object({
                diet: joi.string().valid('Vegetarian', 'Non-Vegetarian', 'Vegan').optional(),
                smoking: joi.boolean().optional(),
                drinking: joi.boolean().optional()
            }).optional()
        }).optional(),

        photos: joi.object({
            profilePicture: joi.string().uri().optional(),
            gallery: joi.array().items(joi.string().uri()).optional()
        }).optional(),

        additionalInfo: joi.object({
            aboutMe: joi.string().optional().max(500),
            expectations: joi.string().optional().max(500),
            customQuestions: joi.object().pattern(joi.string(), joi.any()).optional()
        }).optional(),

        isDeleted: joi.boolean().optional(),
        accountId: joi.string().optional(),
        regionId: joi.string().optional(),
        code: joi.string().optional()
    })
};


export { createUserProfileValidation, updateUserProfileValidation }