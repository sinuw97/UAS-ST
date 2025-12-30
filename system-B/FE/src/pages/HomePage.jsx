import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { getProduk } from "../utils/api.utils";
export default function HomePage() {
  const navigate = useNavigate();
  const [userData] = useState({ name: "User" });
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProduk();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="bg-white p-6 shadow-sm z-10 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-teal-800">
              Selamat Datang, {userData.name}{" "}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Siap berbelanja kebutuhan hari ini?
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-teal-500 w-64 transition-all"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Cart Icon using Link to /cart */}
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 text-gray-400 hover:text-teal-600 transition-colors"
            >
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold border border-white">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-teal-600 transition-colors">
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            {/* Profile Avatar */}
            <div className="w-10 h-10 rounded-full bg-teal-100 border-2 border-teal-200 flex items-center justify-center text-teal-700 font-bold shadow-sm">
              {userData.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Banner / Hero */}
          <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-8 mb-10 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 max-w-lg">
              <h2 className="text-3xl font-bold mb-4">
                Belanja Sayur Segar Langsung dari Petani
              </h2>
              <p className="mb-6 opacity-90">
                Dapatkan diskon 50% untuk pembelian pertama Anda menggunakan
                System A Balance.
              </p>
              <button className="bg-white text-teal-700 font-bold py-2 px-6 rounded-full shadow-md hover:bg-teal-50 transition-transform transform hover:-translate-y-1">
                Belanja Sekarang
              </button>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-0 right-20 -mb-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Kategori Pilihan
              </h3>
              <a
                href="#"
                className="text-teal-600 text-sm font-semibold hover:underline"
              >
                Lihat Semua
              </a>
            </div>
            <div className="flex gap-4">
              {["Semua", "Sayur", "Buah", "Daging", "Bumbu"].map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-teal-600 text-white shadow-md"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span>
                Produk{" "}
                {selectedCategory === "Semua" ? "Terlaris" : selectedCategory}
              </span>
              <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {filteredProducts.length} items
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
                >
                  <div className="relative h-48 bg-gray-100 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                    {/* Image placeholder or actual image */}
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <span className="text-4xl mb-2">
                          {product.category === "Sayur" && "🥬"}
                          {product.category === "Buah" && "🍎"}
                          {product.category === "Daging" && "🥩"}
                          {product.category === "Bumbu" && "🧂"}
                          {product.category === "Umbi" && "🥔"}
                        </span>
                        <span className="text-xs">No Image</span>
                      </div>
                    )}
                    <button
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      onClick={() => addToCart(product)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div>
                    <p className="text-xs text-teal-600 font-semibold mb-1 uppercase tracking-wide">
                      {product.category}
                    </p>
                    <h4 className="font-bold text-gray-800 mb-1">
                      {product.name}
                    </h4>
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-lg font-bold text-teal-700">
                        Rp {product.price.toLocaleString("id-ID")}
                      </p>
                      <button
                        className="p-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-600 hover:text-white transition-colors"
                        onClick={() => addToCart(product)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
