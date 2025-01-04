import * as questionsService from '../../services/questionsService.js';
import * as topicsService from "../../services/topicsService.js";
import * as formValidation from "../../utils/validation.js";

const listQuestions = async ({ params, response }) => {
  //const topicId = params.tId;
  //const questions = await questionsService.getQuestionsByTopic(topicId);
  const questions = await questionsService.listQuestions();
  //console.log("questions: ", questions);
  response.body = { questions };
};

const getQuestionsByTId = async ({ params, response, render }) => {
  const { id: topicId  } = params;
  const topic = await topicsService.getTopicbyId(topicId);
  const questions = await questionsService.getQuestionsbyTopicId(topicId);
  console.log("topic:", topic);
  console.log("questions:", questions);
  render("topic-questions.eta", {topic, questions });
};

const getQuestionsByQId = async ({ params, request, response, render }) => {
  const path = request.url.pathname;
  const { id: topicId , qId } = params;
  const topic = await topicsService.getTopicbyId(topicId);
  const question = await questionsService.getQuestionsbyQuestionId(qId);
  console.log("path:", path);
  console.log("topic:", topic);
  console.log("questions:", question);
  // if (path.startsWith("/topics")) {
  //       console.log("Path starts with '/topics'");
  // }
  // if (path.includes("questions")) {
  //       console.log("Path includes 'questions'");
  // }
  
  render("topic-questions-detail.eta", {topic, question });
};

const addQuestion = async ({ params, request, response, user, render }) => {
  const current_user = 93;  //await state.currentUser;
  const {id: topicId} = params;
  const questions = await questionsService.getQuestionsbyTopicId(topicId)
  const body =  request.body({type: "form"});
  const formData  = await body.value;
  const questionText = formData.get("question_text").trim();
  const errors = [];
  
  if (!formValidation.length(questionText, { minLength: 1 })) {
    errors.push("Question must not be empty");
  }

  if (errors.length > 0) {
    console.log(errors[0])
    render("topic-questions.eta", {errors, questions });
    response.redirect(`/topics/${topicId}`);
    return;
  }

  

  // add question to releval topic
  await questionsService.addQuestionToTopic(topicId, current_user, questionText);
  response.redirect(`/topics/${topicId}`);
};

const deleteQuestion = async ({ params, response }) => {
  const { id: topicId, qId: questionId } = params;
  console.log("topicId::", topicId);
  console.log("questionId::", questionId);
  await questionsService.deleteQuestion(questionId);
  
  response.redirect(`/topics/${topicId}`);
};

export { listQuestions, getQuestionsByTId, getQuestionsByQId, addQuestion, deleteQuestion };