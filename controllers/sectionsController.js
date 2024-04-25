import sections from "../seed/sections.js";
import { Section, Subsection } from "../models/index.js";

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
      attributes: { exclude: ["createdAt", "updatedAt"] },
      order: [["createdAt", "ASC"]]
    });
    res.status(200).json({ sections });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export { create, getAll };
