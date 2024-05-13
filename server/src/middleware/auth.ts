import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

// NextFunction - used for middleware, tells Express to run the next step
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    // adding custom property to type - extend Express type above (interface Request)
    req.userId = (decoded as JwtPayload).userId;
    console.log(req.userId);
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
  next();
};

export default verifyToken;
