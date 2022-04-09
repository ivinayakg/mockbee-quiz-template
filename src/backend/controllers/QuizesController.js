import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

export const getAllQuizesHandler = function () {
  return new Response(200, {}, { quizes: this.db.quizes });
};

export const getSingleQuizHandler = function (schema, request) {
  const Id = request.params.quizId;
  try {
    const quiz = schema.quizes.findBy({ _id: Id });
    return new Response(200, {}, { quiz });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

export const getSingleQuizQuestionAnswer = function (schema, request) {
  const quizId = request.params.quizId;
  const questionId = request.params.questionId;
  try {
    const quiz = schema.quizes.findBy({ _id: quizId });
    const question = quiz.mcqs.find((question) => question._id === questionId);
    return Response(200, {}, { question });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

export const postQuizResultHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { score, quizTaken } = JSON.parse(request.body);
    if (!schema.quizes.findBy({ _id: quizTaken._id })) {
      return Response(
        404,
        {},
        { result: "this quiz is not present in the server" }
      );
    }
    const user = schema.users.findBy({ _id: userId });
    const newUserScore =
      Number(score) > 0
        ? Number(score) + Number(user.totalScore.current)
        : Number(user.totalScore.current);
    const knowledgeLevel =
      newUserScore >= 15
        ? newUserScore >= 25
          ? "Expert"
          : "Amateur"
        : "Rookie";
    const quizTakenByUser = user.quizTaken;
    quizTakenByUser.push({ ...quizTaken });
    this.db.users.update(
      { _id: userId },
      {
        totalScore: { current: newUserScore },
        knowledgeLevel: { current: knowledgeLevel },
        quizTaken: quizTakenByUser,
      }
    );
    return Response(201, {}, { user });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

export const addQuizHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { quiz } = JSON.parse(request.body);
    if (quiz.mcqs.length <= 0 || !quiz.mcqs || !quiz.title) {
      return Response(500, {}, { result: "The data format is not supported" });
    }
    const newQuiz = {
      _id: uuid(),
      createdAt: formatDate(),
      updatedAt: formatDate(),
      catergoryName: "",
      ...quiz,
    };
    const createdQuiz = schema.quizes.create(newQuiz);
    return Response(201, {}, { createdQuiz });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
