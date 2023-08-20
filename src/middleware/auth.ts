import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(400).send({ error: "no token provided" });
    } else {
      const decodedToken = jwt.verify(token, process.env.JWTSECRET as any);
      req.body.user = decodedToken;
      next();
    }
  } catch (error) {
    res.status(500).send({ error: "user is not logged in" });
  }
};
