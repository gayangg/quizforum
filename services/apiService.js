import { sql } from "../database/database.js";


const getRandomQuiz = async () => {
    const rows = await sql`
        SELECT id AS questionId, question_text AS questionText
        FROM questions
        ORDER BY RANDOM()
        LIMIT 1
    `;
    return rows;
}

const getOptionResults = async (qId) => {
    const rows = await sql`
        SELECT id AS optionId, option_text AS optionText
        FROM question_answer_options
        WHERE question_id = ${qId}
    `;
    return rows;
}

const getResults = async (oId, qId) => {
    const rows = await sql`
        SELECT option_text, is_correct
        FROM question_answer_options
        WHERE id= ${oId} AND question_id = ${qId}
    `;
    return rows;
}
const getCorrectAnswerResult = async (qId) => {
    const rows = await sql`
        SELECT option_text 
        FROM question_answer_options
        WHERE question_id = ${qId} AND is_correct = true
    `;
    return rows;
}

export { getRandomQuiz, getOptionResults, getResults, getCorrectAnswerResult }