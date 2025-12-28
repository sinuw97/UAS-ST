export const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login Sistem A</h1>

        <form action="http://localhost:3000/auth/login?redirect=b" method="POST">
          <input
            type="email"
            name="email"
            className="w-full border rounded p-2 mb-4"
            placeholder="Email"
            required
          />

          <input
            type="password"
            name="password"
            className="w-full border rounded p-2 mb-4"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
