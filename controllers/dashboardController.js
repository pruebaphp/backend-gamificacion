import { Level, Section, Subsection, UserProgress } from "../models/index.js";

const dashboard = async (req, res) => {
  const user_id = req.user.id;
  const user_progress = await UserProgress.findAll({
    where: {
      user_id,
    },
    order: [["createdAt", "ASC"]],
  });

  const lastFourUserProgress = user_progress.slice(-5);
  //obtener nivel del usuario
  const current_level_id =
    user_progress[user_progress.length - 1].previus_level;
  const current_level = await Level.findOne({
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

  const graphic_circular = [
    {
      name: "Incorrectas",
      y: (sum_incorrect_answers / sum_total) * 100,
    },
    {
      name: "Correctas",
      y: (sum_correct_answers / sum_total) * 100,
    },
  ];

  res.json({
    last_five_user: lastFourUserProgress,
    history_user: user_progress,
    graphic_circular,
    current_level,
  });
};

export { dashboard };
