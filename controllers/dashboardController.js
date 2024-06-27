import {
  Level,
  Section,
  Subsection,
  User,
  UserProgress,
} from "../models/index.js";

const dashboard = async (req, res) => {
  const user_id = req.user.id;
  const user = await User.findOne({ where: { id: user_id } });
  const user_progress = await UserProgress.findAll({
    where: {
      user_id,
    },
    order: [["createdAt", "ASC"]],
  });

  let lastFourUserProgress = [];
  let graphic_circular = {};
  let current_level = {};

  if (user_progress.length > 0) {
    // Obtener todos los niveles relacionados con los previus_level en una sola consulta
    const levelIds = user_progress.map((progress) => progress.previus_level);
    const levels = await Level.findAll({
      where: {
        id: levelIds,
      },
      include: [
        {
          model: Subsection,
          include: [Section],
        },
      ],
    });

    // Convertir los niveles en un objeto para fácil acceso
    const levelsMap = levels.reduce((acc, level) => {
      acc[level.id] = level;
      return acc;
    }, {});

    // Agregar el current_level a cada registro de user_progress
    const user_progress_with_levels = user_progress.map((progress) => ({
      ...progress.toJSON(), // Convertir a JSON si es necesario
      current_level: levelsMap[progress.previus_level] || null,
    }));
    lastFourUserProgress = user_progress_with_levels.slice(-5);
    //obtener nivel del usuario
    const current_level_id =
      user_progress[user_progress.length - 1]?.previus_level;
    current_level = await Level.findOne({
      where: { id: current_level_id },
      include: [
        {
          model: Subsection,
          include: [
            {
              model: Section,
            },
          ],
        },
      ],
    });

    //obtener grafica circular
    let sum_incorrect_answers = 0;
    let sum_correct_answers = 0;
    let sum_total = 0;
    user_progress.forEach((o) => {
      sum_total += o.incorrect_answers + o.correct_answers;
      sum_incorrect_answers += o.incorrect_answers;
      sum_correct_answers += o.correct_answers;
    });

    graphic_circular = [
      {
        name: "Incorrectas",
        y: (sum_incorrect_answers / sum_total) * 100,
      },
      {
        name: "Correctas",
        y: (sum_correct_answers / sum_total) * 100,
      },
    ];
  }

  res.json({
    last_five_user: lastFourUserProgress,
    history_user: user_progress,
    graphic_circular: graphic_circular,
    current_level: current_level,
    user,
  });
};

export { dashboard };
