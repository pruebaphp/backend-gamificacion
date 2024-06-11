import sections from "../seed/sections.js";
import { Section, Subsection, Level, Difficulty } from "../models/index.js";

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

    sections.forEach((section) => {
      section.subsections.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      section.subsections.forEach((subsection) => {
        subsection.levels.sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
      });
    });

    res.status(200).json({ sections });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export { create, getAll };
