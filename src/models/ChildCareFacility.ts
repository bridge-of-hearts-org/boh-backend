import mongoose, { Schema, Document } from "mongoose";

const childCareDb = mongoose.connection.useDb(
    process.env.NODE_ENV === "production"
        ? `${process.env.MONGODB_CHILDCARE_DATABASE_PROD}`
        : `${process.env.MONGODB_CHILDCARE_DATABASE_TEST}`
);

export interface IChildCareFacility extends Document {
    name: string;
    type: string;
    location: {
        address: string;
        province: string;
        district: string;
        divisionalSecretariat: string;
    };
    contact: {
        phone: string[];
        email?: string[];
        website?: string;
    };
    residents: {
        total: number;
        male?: number;
        female?: number;
    };
    isTestData?: boolean;
}

const ChildCareFacilitySchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        location: {
            address: { type: String, required: true },
            province: { type: String, required: true },
            district: { type: String, required: true },
            divisionalSecretariat: { type: String, required: true },
        },
        contact: {
            phone: { type: [String], required: true },
            email: { type: [String], required: true },
            website: { type: String },
        },
        residents: {
            total: { type: Number, required: true },
            male: { type: Number },
            female: { type: Number },
        },
        isTestData: { type: Boolean },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

export default childCareDb.model<IChildCareFacility>(
    "ChildCareFacility",
    ChildCareFacilitySchema,
    "facilities"
);
