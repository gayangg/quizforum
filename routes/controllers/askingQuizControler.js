import * as askingQuizService from '../../services/askingQuizService.js';
import * as formValidation from "../../utils/validation.js";


const getTopicsForQuiz = async ({ render }) => {
    const errors = [];
    render("quiz.eta", { errors, quiz: await askingQuizService.getTopics() });
};

const getRandomQuestionForTopic = async ({ params, response, render }) => {
    const errors = [];
    const { tId } = params;
    const topic = await askingQuizService.getTopic(tId);
    const question = await askingQuizService.getRandomQuiz(tId);
    const randomIndex = Math.floor(Math.random() * question.length);
    if(question.length >0){
        const randomQuestionId = question[randomIndex].id;
        response.redirect(`/quiz/${tId}/questions/${randomQuestionId}`);
    } else {
        errors.push(`There are no questions available for this topic.`);
        render("quiz-topic.eta", { errors, topic, question });
    }
    //response.redirect(`/quiz/${tId}/questions/${randomQuestionId}`);
};

const getQuestionAndOptions = async ({ params, request, response, render }) => {
    const path = request.url.pathname;
    const errors = [];
    const warnings = [];
    
    const { id, tId, qId } = params;
    if (id === undefined) {
        var tmp = tId;
    } else if(tId === undefined) {
        var tmp = id;
    }
   // const tmp = id ?? tId;
    const topic = await askingQuizService.getTopic(tmp, tId);
    const question = await askingQuizService.getQuestion(qId);
    const options = await askingQuizService.getOptions(qId); 

    if (question.length === 0) {
        errors.push("Question not found.");
        return;
    }

    if(options.length === 0){
        warnings.push("There are no answers added yet for this question.");
        //render("quiz-topic.eta", { errors, topic:topic[0], qId, question, options });
    }

    response.body = {
    id,
    question: question[0],
    options,
    };

    if (path.startsWith("/topics")) {
        console.log("Path starts with '/topics'");
        render("topic-questions-detail.eta", { errors, warnings, topic:topic[0], qId, question: question[0], options });
        return;
    }
    if (path.startsWith("/quiz")) {
        const { tId :id } = params;
        console.log("Path starts with '/quiz'", id);
        render("quiz-topic.eta", { errors, warnings, topic:topic[0], qId, question, options });
        return;
    }
    //render("quiz-topic.eta", { errors, tId, question: question[0], options });
}

const addAnswerOption = async ({ request, response, params, render }) => {
    const { id, qId } = params;
    console.log("topicId::", id, "questionId::", qId);
    const body =  request.body({ type: "form" });
    const formData = await body.value;
    //const { option_text, is_correct } = request.body;
    const option_text = formData.get("option_text");
    const is_correct = formData.get("is_correct") ? true : false;
    
    //const is_correct = { option_text, is_correct: is_correct === "on" };
    const errors = [];

    console.log("option_text::", option_text, "is_coorect::", is_correct);
    // Validation
    if (!option_text || option_text.trim().length === 0) {
        errors.push("Answer option must contain at least one character.");
    }

    if (errors.length > 0) {
        const question = await askingQuizService.getQuestion(qId);
        const options = await askingQuizService.getOptions(qId);
        render("topic-questions-detail.eta", {
            id,
            qId,
            question,
            options,
            errors,
            formData,
        });
        return;
    }
   
    await askingQuizService.addAnswerOption(id,qId, option_text, is_correct);
    response.redirect(`/topics/${id}/questions/${qId}`);
    // try {
    // } catch (error) {
    //     console.error("Error adding answer option:", error);
    //     res.status(500).send("Internal Server Error");
    // }
};


const handleAnswerSelection = async ({ params, user, response, render }) => {
    const errors = [];
    const { tId, qId, oId } = params;
    const userId = 1//user.id;

    const selectedOption = await askingQuizService.getSelectedOption(oId);
    console.log("selectedOption :", selectedOption);
    if (selectedOption.length === 0) {
        errors.push("Answer options not found.");

    }

    const isCorrect = selectedOption[0].is_correct;
    console.log("isCorrect +++", isCorrect);

    // Store the answer in the database
    await askingQuizService.addUserAnswer(userId, qId, oId);
  
    if (isCorrect) {
        response.redirect(`/quiz/${tId}/questions/${qId}/correct`);
    } else {
        const correctOption = await askingQuizService.getCorrectOption(qId);
        console.log("correctOption +++", correctOption);
        // response.body = {
        //     errors: "Sorry! Your answer is not correct.",
        //     correctAnswer: correctOption.length > 0 ? correctOption[0].option_text : "No correct answer found.",
        //     nextQuestionLink: `/quiz/${tId}`,
        // };
       
        const correctAnswer = correctOption.length > 0 ? correctOption[0].option_text : "No correct answer found.";
        const nextQuestionLink = `/quiz/${tId}`;
        console.log("correctAnswer +++", correctAnswer);
        console.log("nextQuestionLink +++", nextQuestionLink);
        // render("quiz-incorrect.eta", { errors,  correctAnswer, nextQuestionLink });
        render("quiz-verification.eta", { correctAnswer, nextQuestionLink});
        response.redirect(`/quiz/${tId}/questions/${qId}/incorrect`);
    }
};

const showQuestion = async ({request, response}) => {
    const errors = [];
    const { id, qId } = request.params;

    try {
        const question = await askingQuizService.getQuestion(qId);
        const options = await askingQuizService.getOptions(qId);
        res.render("question", {
            topicId: id,
            question,
            options,
            errors,
            formData: { option_text: "", is_correct: false },
        });
    } catch (error) {
        console.error("Error fetching question:", error);
        res.status(500).send("Internal Server Error");
    }
};

const deleteAnswerOption = async({request, response, params}) => { 
    const { id: topicId, qId: questionId, oId: optionId} = params;
    console.log("topicId::", topicId);
    console.log("questionId::", questionId);
    console.log("optionId::", optionId);
    const options = await askingQuizService.getOptions(questionId);
    console.log("optionId::", options);
    //await askingQuizService.deleteAnswer(optionId);
    
    response.redirect(`/topics/${topicId}/questions/${questionId}`);
}

const verifyAnswer = async ({ request, params, render }) => {
    const path = request.url.pathname;
    const { tId } = params;
    const topic = await askingQuizService.getTopic(tId);
    const errors = [];
    let verification =false;
    if (path.includes("/correct")) {
        errors.push("Correct!");
        verification = true;
    } else if (path.includes("/incorrect")) {
        errors.push("Incorrect!");
    }
    render("quiz-verification.eta", { errors, topic, verification});
}

export {
    getTopicsForQuiz,
    getRandomQuestionForTopic,
    getQuestionAndOptions,
    addAnswerOption,
    handleAnswerSelection,
    showQuestion,
    deleteAnswerOption,
    verifyAnswer
}