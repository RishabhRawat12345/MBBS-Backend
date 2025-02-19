import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";  
import Routes from "./router/Routes.js"; // Ensure correct file path

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(
    cors({
      origin: "*", // Adjust if needed
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
app.use(bodyParser.json());
app.use(express.static("public")); 
app.use("/api/details", Routes);

// MongoDB Connection
const mongoURI = "mongodb+srv://rawatrishabh76:9pximlAHJoMFA1w9@cluster0.hwguh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
if (!mongoURI) {
    console.error("❌ MONGO_URI is not defined in the .env file!");
    process.exit(1);
}

mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Exit if connection fails
    });

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
