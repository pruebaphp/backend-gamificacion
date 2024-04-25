import { Section, Subsection } from "../models/index.js";

const create = async (req, res) => {
  try {
    const sections = await Section.findAll();

    for (const [index, section] of sections.entries()) {
      for (let i = 1; i <= 5; i++) {
        const subsectionData = {
          name: `Subsección ${i}`,
          section_id: section.id,
        };
        await new Promise((resolve) => setTimeout(resolve, 1000 * index));
        await Subsection.create(subsectionData);
      }
    }
    res.status(200).json({ msg: "Subsecciones creadas" });
  } catch (error) {
    console.error("Error creando subsecciones:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const get = async (req, res) => {
  try {
    const { section_id } = req.params;
    const subsections = await Subsection.findAll({
      where: { section_id },
      order: [["createdAt", "ASC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json({subsections});
  } catch (error) {
    console.error("Error creando subsecciones:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export { create, get };
