import express from "express";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";

import connectDB from "./config/Database.js";
import MessageRouter from "./router/MessageRouter.js";
import UserRouter from "./router/UserRouter.js";
import AppointmentRouter from "./router/AppointmentRouter.js";
import ErrorMiddleware from "./middlewares/Error.js";

const app = express();
dotenv.config();
connectDB();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", MessageRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/appointment", AppointmentRouter);

app.use(ErrorMiddleware);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
