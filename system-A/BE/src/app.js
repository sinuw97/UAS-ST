import express from "express";
import cors from "cors";
import sequelize from "./configs/database.config.js";
import authRoute from "./routes/auth.route.js";
import dashboardRoute from "./routes/dashboard.route.js";
import walletRoute from "./routes/wallet.route.js";
import transactionRoute from "./routes/transaction.route.js";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Route
app.use("/auth", authRoute);
app.use("/dashboard", dashboardRoute);
app.use("/wallet", walletRoute);
app.use("/transaction", transactionRoute);

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
})