import { Server, Model, RestSerializer } from "miragejs";
import {
  loginHandler,
  signupHandler,
  checkToken,
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
import { quizzes } from "./backend/db/quizzes";
import { users } from "./backend/db/users";

export function makeServer({ environment = "development" } = {}) {
  return new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    models: {
      quiz: Model,
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
      quizzes.forEach((item) => {
        server.create("quiz", item);
        // console.log(item);
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

      //check token (private)
      this.post("/auth/checktoken", checkToken.bind(this));

      // quizes routes (public)
      this.get("/quizzes", getAllQuizesHandler.bind(this));
      this.get("/quizzes/:quizId", getSingleQuizHandler.bind(this));
      this.get(
        "/quizzes/:quizId/:questionId",
        getSingleQuizQuestionAnswer.bind(this)
      );

      // categories routes (public)
      this.get("/categories", getAllCategoriesHandler.bind(this));
      this.get("/categories/:categoryId", getCategoryHandler.bind(this));

      // quizes routes (private)
      this.post("/quizzes", addQuizHandler.bind(this));
      this.post("/quizzes/result", postQuizResultHandler.bind(this));
    },
  });
}
