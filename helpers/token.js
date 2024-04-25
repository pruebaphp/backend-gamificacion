import jwt from "jsonwebtoken";

const generateJWT = (id,nombres,apellidos,email) => {
  return jwt.sign({ id, nombres,apellidos, email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export {
    generateJWT,
}

