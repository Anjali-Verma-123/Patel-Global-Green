import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash, FaTimes, FaLeaf } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";

function ResetPassword({ onClose, onOpenLogin }) {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

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
     RESET PASSWORD
  ============================== */

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await api.put(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      toast.success(res.data.message);

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        if (onClose) {
          onClose();
        }

        if (onOpenLogin) {
          onOpenLogin();
        } else {
          navigate("/");
        }
      }, 1500);
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

  const handleBackToLogin = () => {
    if (onClose) {
      onClose();
    }

    if (onOpenLogin) {
      onOpenLogin();
    } else {
      navigate("/");
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
          className="relative hidden min-h-[600px] w-[46%] bg-cover bg-center lg:flex"
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
                Secure Account
              </p>

              <h2 className="text-4xl font-extrabold leading-tight">
                Create a
                <br />
                New
                <br />
                Password.
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-green-50/90">
                Choose a new secure password for your Patel
                Global Green Nursery account.
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
            onSubmit={handleResetPassword}
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
                Account Security
              </p>

              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Reset Password
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Create a new password for your account.
              </p>
            </div>

            {/* NEW PASSWORD */}

            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                New Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
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

            {/* CONFIRM PASSWORD */}

            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-50"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-green-700"
                  aria-label="Toggle password"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
            </div>

            {/* RESET BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-xl py-3.5 font-bold text-white shadow-lg transition ${
                loading
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-green-700 shadow-green-700/20 hover:bg-green-800 hover:shadow-xl"
              }`}
            >
              {loading
                ? "Updating..."
                : "Reset Password"}
            </button>

            {/* LOGIN */}

            <div className="mt-6 border-t border-gray-100 pt-5 text-center">
              <p className="text-sm text-gray-500">
                Remember your password?{" "}
                <button
                  type="button"
                  onClick={handleBackToLogin}
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

export default ResetPassword;