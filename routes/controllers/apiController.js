import * as apiService from '../../services/apiService.js';

const showApi = ({render}) => {
    render("api.eta");
}


const getRandomQuiz = async ({ params, response, render }) => {

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
        console.log("optionsResult:", answerOptions);   
 
        response.body = {
            questionId: qId,
            questionText: qTxt,
            answerOptions,
        };
        
    } catch (error) {
        console.error('Error fetching random question:', error);
  }
}

const getRandomQuizAnswer = async ({ request, response, render }) => { 
    // const errors = [];
    // //const { qId, oId } = request.body;
    // console.log('XXXX:');

    // if (!qId || !oId) {
    //     console.log('AAAAA:');
    //     return response(400).json({ error: 'Missing questionId or optionId' });
    // }

    const  questionResult = await apiService.getRandomQuiz();

    if (questionResult.rowCount === 0) {
        response.body = {}
        return;
    }
    const question = questionResult[0];
    const qId = question.questionid;
    const qTxt = question.questiontext;
    
    const result = await apiService.getOptionResults(qId, oId);

    if (result.rowCount === 0) {
        return response(404).json({ error: 'Option not found for the given question' });
    }
    const { is_correct, option_text } = result.rows[0];
    console.error('is_correct:', is_correct);
    
    if (is_correct) {
      // If the answer is correct
      return response.json({ correct: true });
    } else {
      // If the answer is incorrect, provide the correct option
        const correctAnswerResult = await apiService.getCorrectAnswerResult(qId);
        const correctOptionText =
        correctAnswerResult.rowCount > 0
          ? correctAnswerResult.rows[0].option_text
          : 'No correct option found';

      return response.json({
        correct: false,
        correctAnswer: correctOptionText,
      });
    }
}


export { showApi, getRandomQuiz, getRandomQuizAnswer }