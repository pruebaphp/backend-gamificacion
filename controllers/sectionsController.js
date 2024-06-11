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

const getAll = async (req, res) => {
  try {
    const user_id = "3e012ed1-f899-4097-af55-d4d5d8b0297f"; // Obtener el ID del usuario actual

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
                {
                  model: UserProgress,
                  // where: { user_id },
                },
              ],
              order: [["createdAt", "ASC"]],
            },
          ],
        },
      ],
    });

    sections.forEach((section) => {
      section.dataValues.percentage = 20;
      section.dataValues.description = "Learning new Skills";
      section.subsections.forEach((subsection) => {
        subsection.dataValues.description = "Learning new words";
        subsection.levels.forEach((level) => {
          console.log("level console", level);
          console.log("leveluserprogress", level.user_progress);
          //dataValues
          // console.log('level.is_automatic_unlocked',level.is_automatic_unlocked)
          if (level.user_progress === null || !level.is_automatic_unlocked) {
            level.dataValues.is_blocked = true;
          } else {
            level.dataValues.is_blocked = false;
          }
          // console.log('LEVEL CONSOLE',level)
          delete level.user_progress; // Eliminamos el campo user_progress
        });

        subsection.levels.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      });

      section.subsections.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    });

    res.status(200).json({ sections });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export { create, getAll };
