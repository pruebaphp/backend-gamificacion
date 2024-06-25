import jwt from "jsonwebtoken";
import User from "../models/usersModel.js";

const auth = async (req, res, next) => {

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findOne({
        where: { id: decoded.id },
        attributes: { exclude: ["password", "confirmado", "token", "createdAt", "updatedAt"] },
      });

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ status: false, msg: "Token no válido." });
    }
  }

  if (!token) {
    res.status(401).json({ status: false, msg: "Token no válido." });
    return;
  }
};

export default auth;