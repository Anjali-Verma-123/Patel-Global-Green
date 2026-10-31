import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import {
  FaEye,
  FaEyeSlash,
  FaTimes,
  FaLeaf,
  FaArrowRight,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

function Register({ onClose, onOpenLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ==============================
      ESCAPE KEY
  ============================== */

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  /* ==============================
      REGISTER
  ============================== */

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success(res.data.message);

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        if (onClose) {
          onClose();
        }

        if (onOpenLogin) {
          onOpenLogin();
        }
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ==============================
      OPEN LOGIN
  ============================== */

  const handleOpenLogin = () => {
    if (onClose) {
      onClose();
    }

    if (onOpenLogin) {
      onOpenLogin();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all"
      onClick={onClose}
    >
      {/* MODAL CARD (Warm Soft Tinted Background) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-emerald-900/10 bg-[#f9faf9] p-6 shadow-2xl sm:p-9"
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="group absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-400 shadow-sm transition hover:bg-emerald-100 hover:text-emerald-700"
          aria-label="Close"
        >
          <FaTimes className="text-sm transition group-hover:rotate-90" />
        </button>

        {/* HEADER */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 shadow-sm">
            <FaLeaf className="text-xl" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">
            Create Account
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Join Patel Global Green Nursery today
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gray-200/90 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/15"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full rounded-xl border border-gray-200/90 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/15"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700">
              Password
            </label>
            <div className="relative">
              <FaLock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200/90 bg-white py-3 pl-10 pr-11 text-sm text-gray-800 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/15"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-emerald-700"
                aria-label="Toggle password"
              >
                {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`group mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold tracking-wider uppercase text-white shadow-lg transition-all ${
              loading
                ? "cursor-not-allowed bg-emerald-400"
                : "bg-emerald-700 shadow-emerald-700/25 hover:bg-emerald-800 hover:shadow-xl active:scale-[0.99]"
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              <>
                <span>Create Account</span>
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 border-t border-gray-200/60 pt-5 text-center">
          <p className="text-xs text-gray-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={handleOpenLogin}
              className="font-bold text-emerald-700 transition hover:text-emerald-900 hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;