import express from "express";
import sequelize from "./db/database.js";
import dotenv from "dotenv";
import errorMiddleware from "./middleware/errorMiddleware.js";
import authRouters from "./routes/authRoute.js";
import walletRoute from "./routes/walletRoute.js";
import cors from "cors";
import dashboardRoute from "./routes/dashboardRoute.js";
dotenv.config();

const app = express();
const PORT = 3000;
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// routes
app.use("/auth", authRouters);
app.use("/wallet", walletRoute);
app.use("/dashboard", dashboardRoute);

// err
app.use(errorMiddleware);

try {
  await sequelize.authenticate();
  console.log("Database Connected! ✅");
} catch (error) {
  console.log("Database Connection Error ❌", error);
}

await sequelize.sync();

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
