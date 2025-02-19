import mongoose from 'mongoose';

const formDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Ensure unique emails in the database
    },
    phone: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Timestamps for creation and update

const FormDataModel = mongoose.model('FormData', formDataSchema);

export default FormDataModel;
