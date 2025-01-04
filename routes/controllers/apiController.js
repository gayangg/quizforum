import * as apiService from '../../services/apiService.js';

const getApi = () => {
    
}

const getRandomQuiz = async ({ params, response, render }) => {
    const { tId, qId } = params;
    const errors = [];
   
    try {
    const  questionResult = await apiService.getRandomQuiz();
    console.log("questionResult:", questionResult);

    if (questionResult.rowCount === 0) {
        //return response.status(404).json({ error: 'No questions available' });
        return;
    }
    const question = questionResult.rows[0];
    const qId = question.questionId;
    console.log("question:", question); 
    const optionsResult = await apiService.getOptionResults(qId);
    console.log("optionsResult:", optionsResult);   
    question.answerOptions = optionsResult.rows;
    //response.json(question);
    
    response.body = {
        question: {}
    }
    // response.body = {
    //     //errors: "Sorry! Your answer is not correct.",
    //     // correctAnswer: correctOption.length > 0 ? correctOption[0].option_text : "No correct answer found.",
    //     //nextQuestionLink: `/quiz/${tId}`,
    //     question : question
    // };
        

        //render("quiz-topic.eta", { errors, tId, question: question[0], options });
    } catch (error) {
        console.error('Error fetching random question:', error);
        //response.json({ error: 'Internal Server Error' });
  }
}

const getRandomQuizAnswer = async ({ request, response, render }) => { 
    const errors = [];
    //const { qId, oId } = request.body;
    console.log('XXXX:');

    // if (!qId || !oId) {
    //     console.log('AAAAA:');
    //     return response(400).json({ error: 'Missing questionId or optionId' });
    // }
    
    // const result = await getOptionResults(qId, oId);

    // if (result.rowCount === 0) {
    //     return response(404).json({ error: 'Option not found for the given question' });
    // }
    // const { is_correct, option_text } = result.rows[0];
    // console.error('is_correct:', is_correct);
    
    // if (is_correct) {
    //   // If the answer is correct
    //   return response.json({ correct: true });
    // } else {
    //   // If the answer is incorrect, provide the correct option
    //     const correctAnswerResult = await getCorrectAnswerResult.query(qId);
    //     const correctOptionText =
    //     correctAnswerResult.rowCount > 0
    //       ? correctAnswerResult.rows[0].option_text
    //       : 'No correct option found';

    //   return response.json({
    //     correct: false,
    //     correctAnswer: correctOptionText,
    //   });
    // }
}


export { getRandomQuiz, getRandomQuizAnswer }