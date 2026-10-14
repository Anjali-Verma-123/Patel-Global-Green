import jwt from "jsonwebtoken";

// Verify User Token
export const verifyToken = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided.",
      });
    }

    // Remove "Bearer "
    const jwtToken = token.startsWith("Bearer ")
      ? token.slice(7)
      : token;

    // Verify Token
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

// Verify Admin
// export const isAdmin = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({
//       success: false,
//       message: "Admin Access Only",
//     });
//   }

//   next();
// };

export const isAdmin = (req, res, next) => {
  console.log("Logged User:", req.user);

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin Access Only",
    });
  }

  next();
};