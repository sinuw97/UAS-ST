export default function LoginPage() {
  const handleSSOLogin = () => {
    // redir ke rute sso sistem-a
    window.location.href = "http://localhost:3000/auth/sso-login";
  };

  return (
    <section className="w-full h-screen border flex justify-center items-center bg-[#ebebeb]">
      <div className="w-1/2 h-auto p-5 bg-[#fefefe]">
        <h2 className="font-bold text-3xl text-center mb-6">
          Selamat Datang Di TSUMART
        </h2>
        <button
          onClick={handleSSOLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login Dengan Sistem A
        </button>
      </div>
    </section>
  );
}
