import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Authorization header missing" });

    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) return res.status(401).json({ message: "Invalid authorization format" });

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { sub: "<userId>", email: "..." }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};