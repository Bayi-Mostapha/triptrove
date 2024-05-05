import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(403).json({ message: "Forbidden: No token provided" });
    }
    const token = authorization.split('Bearer ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id; 
      
      next();
    } catch (err) {
      console.log('Invalid token:', err);
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
  };