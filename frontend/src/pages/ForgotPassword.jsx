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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* ==============================
          MODAL
      ============================== */}

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[95vh] w-full max-w-4xl overflow-hidden rounded-[28px] bg-white shadow-2xl"
      >
        {/* CLOSE BUTTON */}

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-md transition hover:bg-green-700 hover:text-white"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        {/* ==============================
            LEFT SIDE
        ============================== */}

        <div
          className="relative hidden min-h-[560px] w-[46%] bg-cover bg-center lg:flex"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200')",
          }}
        >
          <div className="absolute inset-0 bg-green-950/70"></div>

          <div className="relative z-10 flex flex-col justify-between p-10 text-white">
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                <FaLeaf className="text-2xl text-green-200" />
              </div>

              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-green-200">
                Account Recovery
              </p>

              <h2 className="text-4xl font-extrabold leading-tight">
                Get Back
                <br />
                Into Your
                <br />
                Green Space.
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-green-50/90">
                Don't worry. Enter your registered email and
                we'll help you reset your password securely.
              </p>
            </div>

            <div className="border-t border-white/20 pt-5">
              <p className="text-sm text-green-100">
                Grow Green, Live Better 🌿
              </p>
            </div>
          </div>
        </div>

        {/* ==============================
            RIGHT SIDE
        ============================== */}

        <div className="flex w-full items-center justify-center p-6 sm:p-10 lg:w-[54%]">
          <form
            onSubmit={handleForgotPassword}
            className="w-full max-w-md"
          >
            {/* MOBILE BRAND */}

            <div className="mb-7 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <FaLeaf />
              </div>

              <div>
                <p className="font-extrabold text-green-900">
                  Patel Global Green
                </p>

                <p className="text-[10px] font-bold uppercase tracking-widest text-green-600">
                  Nursery
                </p>
              </div>
            </div>

            {/* HEADING */}

            <div className="mb-7">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-green-600">
                Password Recovery
              </p>

              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Forgot Password?
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Enter your registered email to receive a
                password reset link.
              </p>
            </div>

            {/* EMAIL */}

            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-50"
                  required
                />
              </div>
            </div>

            {/* SEND BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className={`group flex w-full items-center justify-center gap-3 rounded-xl py-3.5 font-bold text-white shadow-lg transition ${
                loading
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-green-700 shadow-green-700/20 hover:bg-green-800 hover:shadow-xl"
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}

              {!loading && (
                <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
              )}
            </button>

            {/* LOGIN */}

            <div className="mt-6 border-t border-gray-100 pt-5 text-center">
              <p className="text-sm text-gray-500">
                Remember your password?{" "}
                <button
                  type="button"
                  onClick={handleOpenLogin}
                  className="font-bold text-green-700 transition hover:text-green-900 hover:underline"
                >
                  Back to Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;