import { Server, Model, RestSerializer } from "miragejs";
import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";
import {
  getAllCategoriesHandler,
  getCategoryHandler,
} from "./backend/controllers/CategoryController";
import {
  addQuizHandler,
  getAllQuizesHandler,
  getSingleQuizHandler,
  getSingleQuizQuestionAnswer,
  postQuizResultHandler,
} from "./backend/controllers/QuizesController";

import { categories } from "./backend/db/categories";
import { quizes } from "./backend/db/quizes";
import { users } from "./backend/db/users";

export function makeServer({ environment = "development" } = {}) {
  return new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    models: {
      quizes: Model,
      category: Model,
      user: Model,
      totalScore: Model,
      knowledgeLevel: Model,
      quizTaken: Model,
    },

    // Runs on the start of the server
    seeds(server) {
      // disballing console logs from Mirage
      server.logging = false;
      quizes.forEach((item) => {
        server.create("quizes", { ...item });
      });

      users.forEach((item) =>
        server.create("user", {
          ...item,
          totalScore: { current: 0 },
          knowledgeLevel: { current: "rookie" },
          quizTaken: [],
        })
      );

      categories.forEach((item) => server.create("category", { ...item }));
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // quizes routes (public)
      this.get("/quizes", getAllQuizesHandler.bind(this));
      this.get("/quizes/:quizId", getSingleQuizHandler.bind(this));
      this.get(
        "/quizes/:quizId/:questionId",
        getSingleQuizQuestionAnswer.bind(this)
      );

      // categories routes (public)
      this.get("/categories", getAllCategoriesHandler.bind(this));
      this.get("/categories/:categoryId", getCategoryHandler.bind(this));

      // quizes routes (private)
      this.post("/quizes", addQuizHandler.bind(this));
      this.post("/quizes/result", postQuizResultHandler.bind(this));
    },
  });
}
