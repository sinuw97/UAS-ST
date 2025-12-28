import { Router } from "express";
import { getProduk, getProdukById } from "../controllers/produkController.js";

const produkRouters = Router();

produkRouters.get("/", getProduk);
produkRouters.get("/:id", getProdukById);

export default produkRouters;   