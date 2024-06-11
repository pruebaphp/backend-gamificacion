import { Difficulty, Level, Section, Subsection } from "../models/index.js";

const create = async (req, res) => {
  try {
    const sections = await Section.findAll();
    const difficulties = await Difficulty.findAll();
    const difficultyMap = {
      EASY: difficulties.find((d) => d.name === "EASY").id,
      MEDIUM: difficulties.find((d) => d.name === "MEDIUM").id,
      HARD: difficulties.find((d) => d.name === "HARD").id,
    };
  

    for (const section of sections) {
      const subsections = await Subsection.findAll({
        where: { section_id: section.id },
      });

      for (const subsection of subsections) {
        const levelsData = [
          {
            name: "Nivel 1",
            subsection_id: subsection.id,
            difficulty_id: difficultyMap.EASY,
          },
          {
            name: "Nivel 2",
            subsection_id: subsection.id,
            difficulty_id: difficultyMap.EASY,
          },
          {
            name: "Nivel 3",
            subsection_id: subsection.id,
            difficulty_id: difficultyMap.MEDIUM,
          },
          {
            name: "Nivel 4",
            subsection_id: subsection.id,
            difficulty_id: difficultyMap.MEDIUM,
          },
          {
            name: "Nivel 5",
            subsection_id: subsection.id,
            difficulty_id: difficultyMap.HARD,
          },
        ];

        for (const levelData of levelsData) {
          await new Promise((resolve) => setTimeout(resolve, 2000)); 
          await Level.create(levelData);
        }
      }
    }

    res.status(200).json({ msg: "Niveles creados" });
  } catch (error) {
    console.error("Error creando niveles:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const get = async (req, res) => {
  try {
    const { subsection_id } = req.params;
    const levels = await Level.findAll({
      where: { subsection_id },
      order: [["createdAt", "ASC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json({ levels });
  } catch (error) {
    console.error("Error listando levels:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export { create, get };
