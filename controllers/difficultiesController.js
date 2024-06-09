import Difficulty from "../models/difficultyModel.js";

const getAll = async (req, res) => {
  try {
    const difficulties = await Difficulty.findAll();
    return res.status(200).json({ difficulties });
  } catch (error) {
    console.log("Error al crear el usuario:", error);
    res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export { getAll };
