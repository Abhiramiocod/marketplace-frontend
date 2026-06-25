import { useNavigate } from "react-router-dom";

export default function LoginButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/login")}
      className="bg-[#3525cd] text-white px-5 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:bg-[#2a1db0] active:scale-95 transition-all"
      style={{ fontFamily: "Geist, sans-serif" }}
    >
      Login
    </button>
  );
}
