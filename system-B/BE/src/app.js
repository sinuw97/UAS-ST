import express from "express";
import cors from "cors";
import sequelize from "./configs/database.js";
import authRoute from "./routes/auth.route.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

// Route
app.use("/auth", authRoute);

// DB
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