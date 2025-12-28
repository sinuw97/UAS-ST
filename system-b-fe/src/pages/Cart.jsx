import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";

export default function Cart() {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="bg-white p-6 shadow-sm z-10 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-teal-800">Keranjang Belanja</h1>
            <button onClick={() => navigate('/dashboard')} className="text-sm text-teal-600 hover:underline">
                &larr; Kembali ke Beranda
            </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
            {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-lg font-medium">Keranjang Anda masih kosong.</p>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition"
                    >
                        Mulai Belanja
                    </button>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items List */}
                    <div className="flex-1 space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                     {/* Image placeholder or actual image */}
                                     {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-2xl">🥬</span>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                                    <p className="text-sm text-gray-500">{item.category}</p>
                                    <p className="text-teal-600 font-bold mt-1">Rp {item.price.toLocaleString("id-ID")}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center border border-gray-200 rounded-lg">
                                        <button 
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="px-2 font-medium text-gray-700 w-8 text-center">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => removeItem(item.id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                        title="Hapus"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Card */}
                    <div className="w-full lg:w-80 h-fit bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Ringkasan Belanja</h2>
                        <div className="space-y-2 mb-4 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Total Item</span>
                                <span>{cart.reduce((acc, item) => acc + item.quantity, 0)} Pcs</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg text-teal-800 pt-2 border-t border-gray-100 mt-2">
                                <span>Total Harga</span>
                                <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
                            </div>
                        </div>
                         
                         {/* Payment Method Dummy */}
                        <div className="mb-6 p-4 bg-teal-50 rounded-xl border border-teal-100">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-teal-200 flex items-center justify-center text-teal-700 font-bold text-xs">
                                    SA
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Saldo System A</p>
                                    <p className="text-sm font-bold text-teal-800">Rp 1.500.000</p>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => {
                                setShowSuccessModal(true);
                                // The actual cart clearing and navigation will happen when they close the modal or click the success button
                            }}
                            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md transition-colors transform active:scale-95"
                        >
                            Checkout Sekarang
                        </button>
                    </div>
                </div>
            )}
        </div>
      </main>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md p-4">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl transform transition-all scale-100">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Pembayaran Berhasil!</h3>
                <p className="text-gray-500 mb-8">Terima kasih telah berbelanja di TSUMART. Pesanan Anda akan segera diproses.</p>
                <button 
                    onClick={() => {
                        setCart([]);
                        setShowSuccessModal(false);
                        navigate('/dashboard');
                    }}
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg transition-colors"
                >
                    Kembali ke Beranda
                </button>
            </div>
        </div>
      )}
    </div>
  );
}
