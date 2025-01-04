import * as answersService from '../../services/answersService.js';

const listAnswers = async ({ params, response }) => {
  const questionId = params.qId;
  const options = await answersService.getOptionsByQuestion(questionId);
  response.body = { options };
};

const addAnswerOption = async ({ params, request, response }) => {
  const questionId = params.qId;
  // const body = request.body().value;
  const body = await request.body().value;
  const optionText = body.option_text?.trim();
  const isCorrect = body.is_correct === 'on';
  const errors = [];
  
  if (!optionText) {
    errors.push("Option text must not be empty");
    //return;
  }

  await answersService.createOption(questionId, optionText, isCorrect);
  response.redirect(`/topics/${params.id}/questions/${questionId}`);
};

const deleteAnswerOption = async ({ params, response }) => {
  const { qId: questionId, oId: optionId } = params;
  await answersService.removeOption(optionId);
  response.redirect(`/topics/${params.id}/questions/${questionId}`);
};

export { listAnswers, addAnswerOption, deleteAnswerOption }