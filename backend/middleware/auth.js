import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    // Format: "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Invalid token format" });

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Token is not valid" });

      req.user = decoded; // Save user info for later use
      next(); // ✅ go to next route handler
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default authMiddleware;
