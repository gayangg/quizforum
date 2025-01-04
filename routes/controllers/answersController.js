import * as answersService from '../../services/answersService.js';
import * as formValidation from "../../utils/validation.js";

const listAnswers = async ({ params, response }) => {
  const { qId } = params;
  const options = await answersService.getOptionsByQuestion(questionId);
  response.body = { options };
};

const addAnswerOption = async ({ params, request, response, render }) => {
  const { id, qId } = params;
  const body =  request.body({ type: "form" });
  const formData = await body.value;
  const optionText = formData.get("option_text");
  //const isCrr = formData.is_correct === 'on';
  const isCorrect = formData.has("is_correct");
  const errors = [];
   console.log("errors", errors, "optionText:", optionText , "isCorrect", isCorrect);

  if (!formValidation.length(optionText, { minLength: 1 })) {
    errors.push("Option text must not be empty.");
    console.log("errors", errors, "optionText:", optionText , "isCorrect", isCorrect);
    //render("topic-questions-detail.eta", { errors });
    response.redirect(`/topics/${id}/questions/${qId}`);
    return;
  }

  await answersService.createOption(qId, optionText, isCorrect);
  response.redirect(`/topics/${id}/questions/${qId}`);
};

const deleteAnswerOption = async ({ params, response }) => {
  const { id, qId, oId } = params;
  
  await answersService.removeOption(oId);
  response.redirect(`/topics/${id}/questions/${qId}`);
};

export { listAnswers, addAnswerOption, deleteAnswerOption }