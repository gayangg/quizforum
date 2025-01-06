import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as questionsController from "./controllers/questionsController.js";
import * as authController from "./controllers/authController.js";
import * as answersController from "./controllers/answersController.js";
import * as askingQuizControler from "./controllers/askingQuizControler.js";
import * as apiController from "./controllers/apiController.js";

const router = new Router();
router.get("/", mainController.showMain);

// create/list topics
router.get("/topics", topicsController.listTopics); 
router.post("/topics", topicsController.addTopic);
router.get("/topics/:id", questionsController.getQuestionsByTId);
router.post("/topics/:id/delete", topicsController.deleteTopic);

// create/list questions for a selected topic
router.get("/topics/:id/questions", questionsController.getQuestionsByTId);
router.post("/topics/:id/questions", questionsController.addQuestion);
router.get("/topics/:id/questions/:qId", askingQuizControler.getQuestionAndOptions);

// remove questions
router.post("/topics/:id/questions/:qId/delete", questionsController.deleteQuestion);

// add answers/options
router.post("/topics/:id/questions/:qId/options", questionsController.addAnswerOption);     

// remove answer options
router.post("/topics/:id/questions/:qId/options/:oId/delete", questionsController.deleteAnswerOption);       

// ask/list questions
router.get("/quiz", askingQuizControler.getTopicsForQuiz);                 
router.get("/quiz/:tId", askingQuizControler.getRandomQuestionForTopic);   
router.get("/quiz/:tId/questions/:qId", askingQuizControler.getQuestionAndOptions);
router.post("/quiz/:tId/questions/:qId/options/:oId", askingQuizControler.handleAnswerSelection); 
router.get("/quiz/:tId/questions/:qId/correct", askingQuizControler.verifyAnswer);
router.get("/quiz/:tId/questions/:qId/incorrect", askingQuizControler.verifyAnswer);

// login
router.get("/auth/login", authController.showLoginForm);
router.post("/auth/login", authController.handleLogin);

// register user
router.get("/auth/register", authController.showRegistrationForm); 
router.post("/auth/register", authController.handleRegisteration);

// API
router.get("/api", apiController.showApi);
router.get("/api/questions/random", apiController.getRandomQuiz);
router.post("/api/questions/answer", apiController.getRandomQuizAnswer);

//Logout
router.get("/auth/logout", authController.handleLogout);

export { router };





