import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      navigate("/");
      return;
    }

    axios
      .post("http://localhost:4000/auth/login-with-token", { token })
      .then((res) => {
        // simpan ke localStorage
        localStorage.setItem("userId", JSON.stringify(res.data.id));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
      Verifying your login
    </div>
  )
}