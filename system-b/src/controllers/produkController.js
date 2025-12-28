import Produk from "../models/produk.js";

export const getProduk = async (req, res) => {
    try {
        const produk = await Produk.findAll();
        res.json(produk);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProdukById = async (req, res) => {
    try {
        const produk = await Produk.findByPk(req.params.id);
        res.json(produk);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
