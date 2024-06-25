import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db.js";
import usersRouter from "./routes/usersRouter.js";
import sectionsRouter from "./routes/sectionsRouter.js";
import subsectionsRouter from "./routes/subsectionsRouter.js";
import messagesRouter from "./routes/messagesRouter.js";
import typesQuestionRouter from "./routes/typeQuestionRouter.js";
import difficultyRouter from "./routes/difficultyRouter.js";
import levelRouter from "./routes/levelRouter.js";
import questionsRouter from "./routes/questionRouter.js";
import progressRouter from "./routes/progressUserRouter.js";
import dashboardRouter from "./routes/dashboardRouter.js";

const app = express();

app.use(express.json());

dotenv.config();

try {
  await db.authenticate();
  await db.sync({ alter: true });
} catch (error) {
  console.log(error);
}

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.status(200).json("Hello");
});

app.use("/api/users", usersRouter);
app.use("/api/sections", sectionsRouter);
app.use("/api/subsections", subsectionsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/types-question", typesQuestionRouter);
app.use("/api/difficulty", difficultyRouter);
app.use("/api/levels", levelRouter);
app.use("/api/questions", questionsRouter);
app.use("/api/progress", progressRouter);
app.use("/api/dashboard", dashboardRouter);

app.listen(process.env.PORT, () => {
  console.log(`Proyect start`);
});
