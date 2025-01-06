import * as apiService from '../../services/apiService.js';

const showApi = ({ render, user }) => {
  render("api.eta");
}

const getRandomQuiz = async ({ params, response, render, user }) => {
    const errors = [];
    try {
        const  questionResult = await apiService.getRandomQuiz();

        if (questionResult.rowCount === 0) {
            response.body = {}
            return;
        }
        const question = questionResult[0];
        const qId = question.questionid;
        const qTxt = question.questiontext;
        
        const answerOptions = await apiService.getOptionResults(qId); 
 
        response.body = {
            questionId: qId,
            questionText: qTxt,
            answerOptions,
        };
        
    } catch (error) {
        console.error('Error fetching random question:', error);
  }
}

const getRandomQuizAnswer = async ({ request, response, render, user }) => { 

    const  questionResult = await apiService.getRandomQuiz();
    //return;
  
  try {
    const body = await request.body().value;
    const { questionId, optionId } = body;

    if (!questionId || !optionId) {
      response.status = 400;
      response.body = { error: "Both questionId and optionId are required." };
      return;
    }

    // Check if the option is correct
    const correctOption = await apiService.getCorrectAnswerResult(questionId);

    if (!correctOption || correctOption.length === 0) {
      response.status = 404;
      response.body = { error: "No correct answer found for the question." };
      return;
    }

    const isCorrect = correctOption[0].id === optionId;

    // Send response
    response.status = 200;
    response.body = { correct: isCorrect };
  } catch (error) {
    console.error("Error verifying answer:", error);
    response.status = 500;
    response.body = { error: "Internal server error." };
  }
    
}


export { showApi, getRandomQuiz, getRandomQuizAnswer }