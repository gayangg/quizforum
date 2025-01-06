import * as questionsService from '../../services/questionsService.js';
import * as topicsService from "../../services/topicsService.js";
import * as formValidation from "../../utils/validation.js";

const listQuestions = async ({ params, response }) => {
  const questions = await questionsService.listQuestions();

  response.body = { questions };
};

const getQuestionsByTId = async ({ params, render, user }) => {
  const { id: topicId  } = params;
  const topic = await topicsService.getTopicbyId(topicId);
  const questions = await questionsService.getQuestionsbyTopicId(topicId);
  render("topic-questions.eta", { topic , questions, user });
};


const addQuestion = async ({ params, request, response, user, render }) => {
  const uId = user.id;
  const {id: topicId} = params;
  const questions = await questionsService.getQuestionsbyTopicId(topicId)
  const body =  request.body({type: "form"});
  const formData  = await body.value;
  const questionText = formData.get("question_text").trim();
  const errors = [];
  
  if (!formValidation.length(questionText, { minLength: 1 })) {
    errors.push("Question must not be empty");
   // render("topic-questions.eta", {errors, questions , questionText});
    response.redirect(`/topics/${topicId}`);
    return;
  }

  // add question to releval topic
  await questionsService.addQuestionToTopic(topicId, uId, questionText);
  response.redirect(`/topics/${topicId}`);
};


const deleteQuestion = async ({ params, response }) => {
  const { id: topicId, qId: questionId } = params;
  await questionsService.deleteQuestion(questionId);
  
  response.redirect(`/topics/${topicId}`);
};

const addAnswerOption = async ({ params, request, response, render }) => {
  const { id, qId } = params;
  const body =  request.body({ type: "form" });
  const formData = await body.value;
  const optionText = formData.get("option_text");
  const isCrr = formData.is_correct === 'on';
  const isCorrect = formData.has("is_correct");
  const errors = [];


  if (!formValidation.length(optionText, { minLength: 1 })) {
    errors.push("Option text must not be empty.");
    response.redirect(`/topics/${id}/questions/${qId}`);
    return;
  }

  await questionsService.createAnswerOption(qId, optionText, isCorrect);
  response.redirect(`/topics/${id}/questions/${qId}`);
};

const deleteAnswerOption = async ({ params, response }) => {
  const { id, qId, oId } = params;
  
  await questionsService.removeAnswerOption(oId);
  response.redirect(`/topics/${id}/questions/${qId}`);
};

export { 
  listQuestions, 
  getQuestionsByTId, 
  addQuestion, 
  deleteQuestion, 
  addAnswerOption, 
  deleteAnswerOption 
};