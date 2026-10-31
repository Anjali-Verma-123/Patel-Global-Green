import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  FaTimes,
  FaLeaf,
  FaArrowRight,
  FaEnvelope,
} from "react-icons/fa";
import api from "../services/api";

function ForgotPassword({ onClose, onOpenLogin }) {
  const [email, setEmail] = useState("");
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
      FORGOT PASSWORD
  ============================== */

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post("/auth/forgot-password", {
        email,
      });

      toast.success(res.data.message);

      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ==============================
      BACK TO LOGIN
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
            Forgot Password?
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Enter your email to receive a password reset link
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleForgotPassword} className="space-y-4">
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
                <span>Sending Link...</span>
              </div>
            ) : (
              <>
                <span>Send Reset Link</span>
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 border-t border-gray-200/60 pt-5 text-center">
          <p className="text-xs text-gray-500">
            Remember your password?{" "}
            <button
              type="button"
              onClick={handleOpenLogin}
              className="font-bold text-emerald-700 transition hover:text-emerald-900 hover:underline"
            >
              Back to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;