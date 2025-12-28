import express from "express";
import authRouters from "./routes/authRoute.js";
import cors from "cors";
import produkRouters from "./routes/produkrute.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRouters);

app.use("/produk", produkRouters);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
