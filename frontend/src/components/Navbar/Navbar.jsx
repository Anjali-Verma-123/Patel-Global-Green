import { Link, useNavigate } from "react-router-dom";

import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSearch,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaLeaf,
  FaSignOutAlt,
  FaBoxOpen,
  FaUserCircle,
  FaCog,
} from "react-icons/fa";

import api from "../../services/api";

import {
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

/* AUTH MODALS */

import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ForgotPassword from "../../pages/ForgotPassword";

function Navbar() {
  const navigate = useNavigate();

  const { token, user, logout } = useContext(AuthContext);

  const { cartItems } = useContext(CartContext);

  const { wishlistItems } =
    useContext(WishlistContext);

  /* =========================
     NORMAL NAVBAR STATES
  ========================= */

  const [keyword, setKeyword] = useState("");

  const [showMenu, setShowMenu] =
    useState(false);

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [showCategories, setShowCategories] =
    useState(false);

  const [categories, setCategories] =
    useState([]);

  /* =========================
     AUTH MODAL STATES
  ========================= */

  const [showLogin, setShowLogin] =
    useState(false);

  const [showRegister, setShowRegister] =
    useState(false);

  const [showForgotPassword, setShowForgotPassword] =
    useState(false);

  /* =========================
     REFS
  ========================= */

  const menuRef = useRef(null);

  const categoryRef = useRef(null);

  /* =========================
     OPEN LOGIN
  ========================= */

  const openLogin = () => {
    setShowRegister(false);
    setShowForgotPassword(false);
    setShowLogin(true);

    setMobileMenu(false);
    setShowMenu(false);
  };

  /* =========================
     OPEN REGISTER
  ========================= */

  const openRegister = () => {
    setShowLogin(false);
    setShowForgotPassword(false);
    setShowRegister(true);

    setMobileMenu(false);
    setShowMenu(false);
  };

  /* =========================
     OPEN FORGOT PASSWORD
  ========================= */

  const openForgotPassword = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowForgotPassword(true);

    setMobileMenu(false);
    setShowMenu(false);
  };

  /* =========================
     CLOSE ALL AUTH MODALS
  ========================= */

  const closeAuthModals = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowForgotPassword(false);
  };

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    logout();

    setShowMenu(false);
    setMobileMenu(false);

    /*
      Login ab page nahi hai.
      Logout ke baad login popup open hoga.
    */

    setTimeout(() => {
      openLogin();
    }, 0);
  };

  /* =========================
     SEARCH
  ========================= */

  const handleSearch = (e) => {
    if (
      e.key === "Enter" &&
      keyword.trim()
    ) {
      navigate(
        `/products?search=${encodeURIComponent(
          keyword.trim()
        )}`
      );

      setMobileMenu(false);
    }
  };

  /* =========================
     FETCH CATEGORIES
  ========================= */

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res =
          await api.get("/categories");

        setCategories(
          res.data.categories || []
        );
      } catch (err) {
        console.log(
          "CATEGORY FETCH ERROR:",
          err
        );
      }
    }

    fetchCategories();
  }, []);

  /* =========================
     CLICK OUTSIDE
  ========================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }

      if (
        categoryRef.current &&
        !categoryRef.current.contains(
          event.target
        )
      ) {
        setShowCategories(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =========================
     ESCAPE FOR NAVBAR
  ========================= */

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowMenu(false);
        setShowCategories(false);
        setMobileMenu(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /* =========================
     CLOSE MOBILE ON RESIZE
  ========================= */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenu(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  return (
    <>
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">

        {/* =========================
            MAIN NAVBAR
        ========================= */}

        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="flex h-[78px] items-center justify-between gap-6">

            {/* =========================
                LOGO
            ========================= */}

            <Link
              to="/"
              className="group flex flex-shrink-0 items-center gap-3"
              onClick={() => {
                setMobileMenu(false);
                setShowCategories(false);
              }}
            >

              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-green-100 shadow-sm transition-all duration-300 group-hover:border-green-600">

                <img
                  src="/logo.jpeg"
                  alt="Patel Global Green"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

              </div>

              <div className="hidden sm:block">

                <h1 className="text-lg font-bold leading-tight text-green-800 xl:text-xl">
                  Patel Global Green
                </h1>

                <p className="mt-0.5 text-[10px] uppercase tracking-[2px] text-gray-400">
                  Grow • Care • Bloom
                </p>

              </div>

            </Link>

            {/* =========================
                DESKTOP MENU
            ========================= */}

            <div className="hidden items-center gap-7 lg:flex xl:gap-9">

              <Link
                to="/"
                className="text-sm font-semibold text-gray-700 transition hover:text-green-700"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="text-sm font-semibold text-gray-700 transition hover:text-green-700"
              >
                Plants
              </Link>

              {/* =========================
                  CATEGORIES
              ========================= */}

              <div
                className="relative"
                ref={categoryRef}
              >

                <button
                  type="button"
                  onClick={() =>
                    setShowCategories(
                      !showCategories
                    )
                  }
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-green-700"
                >

                  Categories

                  <FaChevronDown
                    className={`text-[10px] transition-transform duration-300 ${
                      showCategories
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>

                {showCategories && (
                  <div className="absolute left-1/2 top-full z-50 mt-4 w-64 -translate-x-1/2 rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl">

                    <div className="mb-1 px-3 py-2">

                      <p className="text-xs font-bold uppercase tracking-wider text-green-600">
                        Shop By Category
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Find the perfect green addition
                      </p>

                    </div>

                    {categories.map(
                      (category) => (
                        <button
                          type="button"
                          key={category._id}
                          onClick={() => {
                            navigate(
                              `/products?category=${category._id}`
                            );

                            setShowCategories(
                              false
                            );
                          }}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                        >

                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-700">
                            <FaLeaf className="text-xs" />
                          </span>

                          {category.name}

                        </button>
                      )
                    )}

                  </div>
                )}

              </div>

              <Link
                to="/about"
                className="text-sm font-semibold text-gray-700 transition hover:text-green-700"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="text-sm font-semibold text-gray-700 transition hover:text-green-700"
              >
                Contact
              </Link>

            </div>

            {/* =========================
                DESKTOP RIGHT SIDE
            ========================= */}

            <div className="hidden items-center gap-4 lg:flex">

              {/* SEARCH */}

              <div className="flex h-10 w-44 items-center rounded-full border border-gray-100 bg-gray-50 px-4 transition-all focus-within:border-green-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-green-50 xl:w-52">

                <FaSearch className="flex-shrink-0 text-sm text-gray-400" />

                <input
                  type="text"
                  placeholder="Search plants..."
                  value={keyword}
                  onChange={(e) =>
                    setKeyword(e.target.value)
                  }
                  onKeyDown={handleSearch}
                  className="ml-2 w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />

              </div>

              <div className="h-7 w-px bg-gray-200"></div>

              {/* WISHLIST */}

              <Link
                to="/wishlist"
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-all hover:bg-red-50 hover:text-red-500"
                title="Wishlist"
              >

                <FaHeart className="text-lg" />

                {wishlistItems.length >
                  0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 px-1 text-[10px] font-bold text-white">
                    {wishlistItems.length}
                  </span>
                )}

              </Link>

              {/* CART */}

              <Link
                to="/cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-all hover:bg-green-50 hover:text-green-700"
                title="Cart"
              >

                <FaShoppingCart className="text-lg" />

                {cartItems.length >
                  0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-green-700 px-1 text-[10px] font-bold text-white">
                    {cartItems.reduce(
                      (total, item) =>
                        total + item.quantity,
                      0
                    )}
                  </span>
                )}

              </Link>

              {/* =========================
                  LOGGED IN
              ========================= */}

              {token ? (
                <div
                  className="relative"
                  ref={menuRef}
                >

                  <button
                    type="button"
                    onClick={() =>
                      setShowMenu(!showMenu)
                    }
                    className="flex items-center gap-2 rounded-full border border-gray-100 py-1.5 pl-2 pr-3 transition-all hover:border-green-200 hover:bg-green-50"
                  >

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
                      {user?.name
                        ? user.name
                            .charAt(0)
                            .toUpperCase()
                        : "U"}
                    </div>

                    <span className="hidden max-w-[90px] truncate text-sm font-semibold text-gray-700 xl:block">
                      {user?.name ||
                        "Account"}
                    </span>

                    <FaChevronDown
                      className={`text-[9px] text-gray-400 transition-transform ${
                        showMenu
                          ? "rotate-180"
                          : ""
                      }`}
                    />

                  </button>

                  {/* USER DROPDOWN */}

                  {showMenu && (
                    <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">

                      {/* USER INFO */}

                      <div className="bg-green-50 p-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-700 text-lg font-bold text-white">
                            {user?.name
                              ? user.name
                                  .charAt(0)
                                  .toUpperCase()
                              : "U"}
                          </div>

                          <div className="min-w-0">

                            <p className="truncate font-bold text-green-800">
                              {user?.name ||
                                "User"}
                            </p>

                            <p className="truncate text-xs text-gray-500">
                              {user?.email}
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* PROFILE */}

                      <Link
                        to="/profile"
                        onClick={() =>
                          setShowMenu(false)
                        }
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                      >
                        <FaUserCircle />
                        My Profile
                      </Link>

                      {/* ORDERS */}

                      <Link
                        to="/my-orders"
                        onClick={() =>
                          setShowMenu(false)
                        }
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                      >
                        <FaBoxOpen />
                        My Orders
                      </Link>

                      {/* ADMIN */}

                      {user?.role ===
                        "admin" && (
                        <Link
                          to="/admin"
                          onClick={() =>
                            setShowMenu(false)
                          }
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                        >
                          <FaCog />
                          Admin Dashboard
                        </Link>
                      )}

                      <div className="border-t border-gray-100"></div>

                      {/* LOGOUT */}

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-500 transition hover:bg-red-50"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>

                    </div>
                  )}

                </div>
              ) : (

                /* =========================
                   LOGGED OUT
                ========================= */

                <div className="flex items-center gap-2">

                  <button
                    type="button"
                    onClick={openLogin}
                    className="px-4 py-2 text-sm font-semibold text-gray-700 transition hover:text-green-700"
                  >
                    Login
                  </button>

                  <button
                    type="button"
                    onClick={openRegister}
                    className="rounded-full bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green-800 hover:shadow-lg"
                  >
                    Register
                  </button>

                </div>
              )}

            </div>

            {/* =========================
                MOBILE BUTTON
            ========================= */}

            <button
              type="button"
              onClick={() =>
                setMobileMenu(!mobileMenu)
              }
              className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-lg text-green-700 transition hover:bg-green-100 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenu ? (
                <FaTimes />
              ) : (
                <FaBars />
              )}
            </button>

          </div>

        </div>

        {/* =====================================================
            MOBILE MENU
        ====================================================== */}

        {mobileMenu && (
          <div className="border-t border-gray-100 bg-white shadow-xl lg:hidden">

            <div className="mx-auto max-w-7xl px-5 py-5">

              {/* SEARCH */}

              <div className="mb-5 flex h-12 items-center rounded-xl border border-gray-100 bg-gray-50 px-4">

                <FaSearch className="text-gray-400" />

                <input
                  type="text"
                  placeholder="Search plants..."
                  value={keyword}
                  onChange={(e) =>
                    setKeyword(e.target.value)
                  }
                  onKeyDown={handleSearch}
                  className="ml-3 w-full bg-transparent text-sm outline-none"
                />

              </div>

              {/* LINKS */}

              <div className="space-y-1">

                <Link
                  to="/"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="flex items-center rounded-xl px-4 py-3 font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700"
                >
                  Home
                </Link>

                <Link
                  to="/products"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="flex items-center rounded-xl px-4 py-3 font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700"
                >
                  Plants
                </Link>

                {/* MOBILE CATEGORIES */}

                <div className="py-2">

                  <p className="mb-2 px-4 text-xs font-bold uppercase tracking-wider text-green-600">
                    Categories
                  </p>

                  <div className="grid grid-cols-2 gap-2">

                    {categories.map(
                      (category) => (
                        <button
                          type="button"
                          key={category._id}
                          onClick={() => {
                            navigate(
                              `/products?category=${category._id}`
                            );

                            setMobileMenu(
                              false
                            );
                          }}
                          className="flex items-center gap-2 rounded-xl bg-green-50 px-3 py-3 text-sm text-gray-700 transition hover:bg-green-100 hover:text-green-700"
                        >

                          <FaLeaf className="text-xs text-green-600" />

                          {category.name}

                        </button>
                      )
                    )}

                  </div>

                </div>

                <Link
                  to="/about"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="flex items-center rounded-xl px-4 py-3 font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700"
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="flex items-center rounded-xl px-4 py-3 font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700"
                >
                  Contact
                </Link>

                {/* WISHLIST */}

                <Link
                  to="/wishlist"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="flex items-center justify-between rounded-xl px-4 py-3 font-semibold text-gray-700 hover:bg-red-50 hover:text-red-500"
                >

                  <span className="flex items-center gap-3">
                    <FaHeart />
                    Wishlist
                  </span>

                  {wishlistItems.length >
                    0 && (
                    <span className="rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                      {wishlistItems.length}
                    </span>
                  )}

                </Link>

                {/* CART */}

                <Link
                  to="/cart"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="flex items-center justify-between rounded-xl px-4 py-3 font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700"
                >

                  <span className="flex items-center gap-3">
                    <FaShoppingCart />
                    Cart
                  </span>

                  {cartItems.length >
                    0 && (
                    <span className="rounded-full bg-green-700 px-2 py-1 text-xs text-white">
                      {cartItems.reduce(
                        (total, item) =>
                          total +
                          item.quantity,
                        0
                      )}
                    </span>
                  )}

                </Link>

              </div>

              {/* =========================
                  MOBILE AUTH
              ========================= */}

              <div className="mt-4 border-t border-gray-100 pt-5">

                {token ? (

                  <div className="space-y-2">

                    {/* USER */}

                    <div className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 font-bold text-white">
                        {user?.name
                          ? user.name
                              .charAt(0)
                              .toUpperCase()
                          : "U"}
                      </div>

                      <div className="min-w-0">

                        <p className="font-semibold text-green-800">
                          {user?.name}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                          {user?.email}
                        </p>

                      </div>

                    </div>

                    <Link
                      to="/profile"
                      onClick={() =>
                        setMobileMenu(false)
                      }
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-700 hover:bg-green-50"
                    >
                      <FaUser />
                      My Profile
                    </Link>

                    <Link
                      to="/my-orders"
                      onClick={() =>
                        setMobileMenu(false)
                      }
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-700 hover:bg-green-50"
                    >
                      <FaBoxOpen />
                      My Orders
                    </Link>

                    {user?.role ===
                      "admin" && (
                      <Link
                        to="/admin"
                        onClick={() =>
                          setMobileMenu(false)
                        }
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-700 hover:bg-green-50"
                      >
                        <FaCog />
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-red-500 hover:bg-red-50"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>

                  </div>

                ) : (

                  <div className="grid grid-cols-2 gap-3">

                    <button
                      type="button"
                      onClick={openLogin}
                      className="rounded-xl border border-green-700 py-3 font-semibold text-green-700 transition hover:bg-green-50"
                    >
                      Login
                    </button>

                    <button
                      type="button"
                      onClick={openRegister}
                      className="rounded-xl bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800"
                    >
                      Register
                    </button>

                  </div>

                )}

              </div>

            </div>

          </div>
        )}

      </nav>

      {/* =====================================================
          AUTH MODALS
      ====================================================== */}

      {showLogin && (
        <Login
          onClose={closeAuthModals}
          onOpenRegister={openRegister}
          onOpenForgotPassword={
            openForgotPassword
          }
        />
      )}

      {showRegister && (
        <Register
          onClose={closeAuthModals}
          onOpenLogin={openLogin}
        />
      )}

      {showForgotPassword && (
        <ForgotPassword
          onClose={closeAuthModals}
          onOpenLogin={openLogin}
        />
      )}
    </>
  );
}

export default Navbar;