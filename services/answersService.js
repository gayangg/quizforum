import * as answersRepo from '../database/answersRepo.js';

const getOptionsByQuestion = (questionId) => answersRepo.getOptions(questionId);

const createOption = (questionId, text, isCorrect) => 
  answersRepo.addOption(questionId, text, isCorrect);

const removeOption = (id) => answersRepo.deleteOption(id);

export { getOptionsByQuestion, createOption, removeOption}