import express from "express";
import sequelize from "./db/database.js";
import dotenv from "dotenv";
import authRouters from "./routes/authRoute.js";
import financeRouter from "./routes/financeRoute.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/auth", authRouters);
app.use("/finance", financeRouter);

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
