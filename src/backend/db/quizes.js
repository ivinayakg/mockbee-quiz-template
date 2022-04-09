import { v4 as uuid } from "uuid";

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const quizes = [
  {
    _id: uuid(),
    title: "You Can WIN",
    totalScore: 20,
    mcqs: [
      {
        _id: uuid(),
        question: "Which season Harvey is the Most Badass One",
        options: ["Season 1", "Season 2", "Season 6", "Every Season"],
        answer: "Every Season",
      },
      {
        _id: uuid(),
        question: "In which season does Mike was imprisoned",
        options: ["Season 3", "Season 5", "Season 7", "Season 4"],
        answer: "Season 4",
      },
      {
        _id: uuid(),
        question: "Harvey had what kind of emotional problems",
        options: ["Attachment Issues", "Panic Attack", "Trauma", "Stress"],
        answer: "Attachment Issues",
      },
    ],
    catergoryName: "TV Show",
  },
];
