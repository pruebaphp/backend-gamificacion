import { Level, UserProgress } from "../models/index.js";
import { Op } from "sequelize";

const setProgress = async (req, res) => {
  const { correct_answers, incorrect_answers, level_id } = req.body;

  try {
    // Encuentra el nivel actual
    const currentLevel = await Level.findOne({ where: { id: level_id } });
    if (!currentLevel) {
      return res.status(404).json({ message: "Nivel no encontrado" });
    }

    // Encuentra el siguiente nivel basado en la fecha de creación
    const nextLevel = await Level.findOne({
      where: {
        createdAt: {
          [Op.gt]: currentLevel.createdAt,
        },
      },
      order: [["createdAt", "ASC"]],
    });

    if (!nextLevel) {
      return res
        .status(200)
        .json({ message: "Has completado todos los niveles" });
    }

    // Crear un nuevo progreso para el usuario
    const progress = await UserProgress.create({
      correct_answers,
      incorrect_answers,
      //   total_questions,
      previus_level: level_id,
      level_id: nextLevel.id,
      user_id: req.user.id,
      completed: correct_answers == 4 ? true : false,
    });

    res.status(201).json({
      message: "Progreso guardado correctamente",
      nextLevel: nextLevel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al guardar el progreso" });
  }
};

export { setProgress };
