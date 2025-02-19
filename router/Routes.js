import express from "express";
import FormDataModel from "../models/formDataModel.js"; // Ensure correct path

const router = express.Router();

// Use POST for form submissions

router.post('/apply', async (req, res) => {
    try {
        // Destructure the necessary fields from the request body
        const { name, email, phone, country } = req.body;

        // Validate input
        if (!name || !email || !phone || !country) {
            return res.status(400).json({ message: "Please enter all required fields" });
        }

        // Validate phone number format (e.g., should only contain digits, +, and spaces)
        const phoneRegex = /^[\+\d\-\s]{10,20}$/;  // Example validation, adjust as needed
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: "Invalid phone number format" });
        }

        // Check if the email is already used
        const existingApplicant = await FormDataModel.findOne({ email });
        if (existingApplicant) {
            return res.status(400).json({ message: "Email is already used for another application" });
        }

        // Create a new form data entry
        const newFormData = new FormDataModel({
            name,
            email,
            phone,
            country,
        });

        // Save the new form data to the database
        await newFormData.save();

        // Respond with success
        res.status(201).json({ message: "Application submitted successfully!" });

    } catch (error) {
        console.error("Error in Apply route:", error);
        res.status(500).json({ message: "Server error, please try again later" });
    }
});


// Export the router
export default router;
