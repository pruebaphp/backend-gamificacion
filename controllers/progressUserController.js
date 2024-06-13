import { Level, UserProgress } from "../models/index.js";
import { Op } from "sequelize";

const setProgress = async (req, res) => {
  // Obtén los datos del cuerpo de la solicitud
//   const correct_answers = 4;
//   const incorrect_answers = 0;
//   const total_questions = 4;
//   const level_id = "49550d89-1f62-44f4-bb10-f0d9ead47e46";
//   const user_id = "3e012ed1-f899-4097-af55-d4d5d8b0297f";
  const {correct_answers,level_id} = req.body
  

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
    //   incorrect_answers,
    //   total_questions,
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
