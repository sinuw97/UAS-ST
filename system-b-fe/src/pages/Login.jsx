export default function Login() {
  const handleSSOLogin = () => {
    // redir ke rute sso sistem-a
    window.location.href = "http://localhost:3000/auth/sso-login";
  }

  return (
    <div className="flex justify-center items-center p-40">
      <section className="flex w-full h-[400px] border">
        <div className="w-1/2 h-full bg-gray-200"></div>
        <div className="w-1/2 h-full">
          <h2 className="font-bold text-3xl">Selamat Datang</h2>
          <button onClick={handleSSOLogin} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Login Dengan Sistem A
          </button>
        </div>
      </section>
    </div>
  );
}
