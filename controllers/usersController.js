import { generateJWT } from "../helpers/token.js";
import User from "../models/usersModel.js";
import bcrypt from "bcrypt";

const create = async (req, res) => {
  const { nombres, apellidos, dni, email, password, rol } = req.body;
  const fields = { nombres, apellidos, dni, email, password, rol };
  const emptyFields = [];

  for (const field in fields) {
    if (!fields[field]) {
      emptyFields.push(field);
    }
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({
      msg: `The following fields are empty: ${emptyFields.join(",")}.`,
    });
  }

  const userByEmail = await User.findOne({
    where: { email },
  });

  if (userByEmail) {
    return res
      .status(409)
      .json({ msg: `El usuario con el email: '${email}' ya existe.` });
  }

  const userByDNI = await User.findOne({
    where: { dni },
  });

  if (userByDNI) {
    return res
      .status(409)
      .json({ msg: `El usuario con el dni: '${dni}' ya existe.` });
  }

  const user = new User({
    nombres,
    apellidos,
    dni,
    email,
    password: bcrypt.hashSync(password, 10),
    token: "",
    confirmado: true,
    status: 1,
    rol,
  });

  try {
    await user.save();
    res.status(200).json({ msg: "Usuario creado exitosamente." });
  } catch (error) {
    console.log("Error al crear el usuario:", error);
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log("Error al buscar usuarios:", error);
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if ([email, password].includes("")) {
      return res.status(400).json({ msg: "All fields are required." });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ msg: `User not found.` });
    }
    if (!user.status) {
      return res.status(400).json({ msg: `User isn't active.` });
    }

    const verifyPass = bcrypt.compareSync(password, user.password);

    if (!verifyPass) {
      return res.status(401).json({ msg: `User not found.` });
    }

    const userSend = {
      id: user.id,
      nombres: user.nombres,
      apellidos: user.apellidos,
      email: user.email,
      dni: user.dni,
      rol: user.rol,
      token: generateJWT(user.id, user.nombres, user.apellidos, user.email),
    };

    res.status(200).json({ user: userSend,msg:'Login' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "User not found." });
  }
};

const profile = async (req, res) => {
  res.status(200).json({user:req.user});
};

export { create, getAll, login, profile };
