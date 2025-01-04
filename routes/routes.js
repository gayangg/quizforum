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

//router.get("/topics", topicsController.getTopicsWithPagination);
router.get("/topics", topicsController.listTopics); //done
router.post("/topics", topicsController.addTopic); //done
router.get("/topics/:id", questionsController.getQuestionsByTId); //done
router.post("/topics/:id/delete", topicsController.deleteTopic); //done

// create/list questions for a selected topic
router.get("/topics/:id/questions", questionsController.getQuestionsByTId); //done
router.post("/topics/:id/questions", questionsController.addQuestion); //done
router.get("/topics/:id/questions/:qId", askingQuizControler.getQuestionAndOptions); //done

// remove questions
router.post("/topics/:id/questions/:qId/delete", questionsController.deleteQuestion); //done

// add answers/options
//router.post("/topics/:id/questions/:qId/options", askingQuizControler.handleAnswerSelection);
//router.post("/topics/:id/questions/:qId/options", askingQuizControler.addAnswerOption);     // not complete
router.post("/topics/:id/questions/:qId/options", questionsController.addAnswerOption);     // done

// remove answer options
router.post("/topics/:id/questions/:qId/options/:oId/delete", questionsController.deleteAnswerOption);       // done

// ask/list questions
router.get("/quiz", askingQuizControler.getTopicsForQuiz);                  //done
router.get("/quiz/:tId", askingQuizControler.getRandomQuestionForTopic);    //done
router.get("/quiz/:tId/questions/:qId", askingQuizControler.getQuestionAndOptions); //done
router.post("/quiz/:tId/questions/:qId/options/:oId", askingQuizControler.handleAnswerSelection); 
//router.post("/quiz/:tId/questions/:qId/options/:oId", answersController.addAnswerOption); 
router.get("/quiz/:tId/questions/:qId/correct", askingQuizControler.verifyAnswer); //done
router.get("/quiz/:tId/questions/:qId/incorrect", askingQuizControler.verifyAnswer); //done

// login
router.get("/auth/login", authController.showLoginForm);
router.post("/auth/login", authController.handleLogin);

// register user
router.get("/auth/register", authController.showRegistrationForm); //done
router.post("/auth/register", authController.handleRegisteration); //done

// API
router.get("/api", apiController.showApi);
router.get("/api/questions/random", apiController.getRandomQuiz);
router.post("/api/questions/answer", apiController.getRandomQuizAnswer);

//Logout
router.get("/auth/logout", authController.handleLogout);

export { router };





