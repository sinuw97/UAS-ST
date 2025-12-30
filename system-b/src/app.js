import express from "express";
import authRouters from "./routes/authRoute.js";
import cors from "cors";
import produkRouters from "./routes/produkrute.js";

const app = express();
const PORT = 4000;
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(express.json());
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

app.use("/auth", authRouters);

app.use("/produk", produkRouters);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
