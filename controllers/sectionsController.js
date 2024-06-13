import sections from "../seed/sections.js";
import {
  Section,
  Subsection,
  Level,
  Difficulty,
  UserProgress,
} from "../models/index.js";

const create = async (req, res) => {
  try {
    for (const [index, o] of sections.entries()) {
      await new Promise((resolve) => setTimeout(resolve, 1000 * index));

      const section = new Section(o);
      await section.save();
    }
    res.status(200).json({ msg: "Secciones creadas" });
  } catch (error) {
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const getAllPlay = async (req, res) => {
  try {
    const user_id = req.user.id;

    const sections = await Section.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: Subsection,
          attributes: {
            exclude: ["updatedAt"],
          },
          order: [["createdAt", "ASC"]],
          include: [
            {
              model: Level,
              attributes: {
                exclude: ["updatedAt", "difficulty_id"],
              },
              include: [
                {
                  model: Difficulty,
                  attributes: [["name", "name"]],
                },
              ],
              order: [["createdAt", "ASC"]],
            },
          ],
        },
      ],
    });

    for (const section of sections) {
      let totalLevels = 0;
      let completedLevels = 0;

      for (const subsection of section.subsections) {
        for (const level of subsection.levels) {
          totalLevels++;

          const level_id = level.id;
          const findUserProgress = await UserProgress.findOne({
            where: { level_id, completed: true, user_id },
          });

          if (findUserProgress != null || level.is_automatic_unlocked) {
            completedLevels++;
            level.dataValues.is_blocked = false;
          } else {
            level.dataValues.is_blocked = true;
          }

          delete level.user_progress; // Eliminamos el campo user_progress
        }

        subsection.levels.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      }

      section.subsections.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      // Calcular el porcentaje de la sección
      section.dataValues.percentage =
        (completedLevels / totalLevels) * 100 || 0;
      section.dataValues.description = "Learning new Skills";
    }

    res.status(200).json({ sections });
  } catch (error) {
    console.error("Error al obtener las secciones:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const getAll = async (req, res) => {
  try {
    const sections = await Section.findAll({ order: [["createdAt", "ASC"]] });
    res.status(200).json({ sections });
  } catch (error) {
    console.error("Error al obtener las secciones:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export { create, getAllPlay, getAll };
