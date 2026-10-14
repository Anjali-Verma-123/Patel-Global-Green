import { useState, useContext, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import {
  FaEye,
  FaEyeSlash,
  FaTimes,
  FaLeaf,
  FaArrowRight,
} from "react-icons/fa";

function Login({
  onClose,
  onOpenRegister,
  onOpenForgotPassword,
}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

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
     LOGIN
  ============================== */

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      toast.success(res.data.message);

      console.log(res.data);

      // Token ko browser me save karenge
      // localStorage.setItem("token", res.data.token);

      login(res.data.token, res.data.user);

      if (onClose) {
        onClose();
      }

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ==============================
     REGISTER
  ============================== */

  const handleOpenRegister = () => {
    if (onClose) {
      onClose();
    }

    if (onOpenRegister) {
      onOpenRegister();
    }
  };

  /* ==============================
     FORGOT PASSWORD
  ============================== */

  const handleOpenForgotPassword = () => {
    if (onClose) {
      onClose();
    }

    if (onOpenForgotPassword) {
      onOpenForgotPassword();
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
        {/* ==============================
            CLOSE BUTTON
        ============================== */}

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
          className="relative hidden min-h-[600px] w-[46%] bg-cover bg-center lg:flex"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200')",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative z-10 flex flex-col justify-between p-10 text-white">
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                <FaLeaf className="text-2xl text-green-200" />
              </div>

              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-green-200">
                Patel Global Green
              </p>

              <h2 className="text-4xl font-extrabold leading-tight">
                Welcome
                <br />
                Back to
                <br />
                Your Green Space.
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-green-50/90">
                Discover beautiful plants, premium pots and
                gardening essentials. Bring nature into your
                home with Patel Global Green Nursery.
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

        <div className="flex max-h-[95vh] w-full items-center justify-center overflow-y-auto p-6 sm:p-10 lg:w-[54%]">
          <form
            onSubmit={handleLogin}
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
                Welcome Back
              </p>

              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Login to continue 🌿
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Login to continue your green journey.
              </p>
            </div>

            {/* EMAIL */}

            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}

            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-50"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-green-700"
                  aria-label="Toggle password"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
            </div>

            {/* FORGOT PASSWORD */}

            <div className="mb-6 flex justify-end">
              <button
                type="button"
                onClick={handleOpenForgotPassword}
                className="text-sm font-semibold text-green-700 transition hover:text-green-900 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className={`group flex w-full items-center justify-center gap-3 rounded-xl py-3.5 font-bold text-white shadow-lg transition ${
                loading
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-green-700 shadow-green-700/20 hover:bg-green-800 hover:shadow-xl"
              }`}
            >
              {loading ? "Logging in..." : "Login"}

              {!loading && (
                <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
              )}
            </button>

            {/* REGISTER */}

            <div className="mt-6 border-t border-gray-100 pt-5 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={handleOpenRegister}
                  className="font-bold text-green-700 transition hover:text-green-900 hover:underline"
                >
                  Create Account
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;