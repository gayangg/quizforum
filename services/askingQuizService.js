import { sql } from "../database/database.js";

const getTopics = async () => {
    const rows = await sql`
        SELECT id, name
        FROM topics
        ORDER BY name ASC
    `;
    return rows;
}
const getTopic = async (tmp) => {
    const rows = await sql`
        SELECT id,name
        FROM topics
        WHERE id = ${tmp}
    `;
    return rows;
}
const getRandomQuiz = async (tId) => {
    const rows = await sql`
        SELECT id FROM questions
        WHERE topic_id = ${tId}
    `;
    return rows;
}

const getQuestion = async (qId) => {
    const rows = await sql`
        SELECT question_text
        FROM questions
        WHERE id = ${qId}
    `;
    return rows;
}

const getOptions = async (qId) => {
    const rows = await sql`
        SELECT id, is_correct, option_text
        FROM question_answer_options
        WHERE question_id = ${qId}
    `;
    return rows;
}

const getSelectedOption = async (oId) => {
    const rows = await sql`
        SELECT id,is_correct
        FROM question_answer_options
        WHERE id = ${oId}
    `;
    return rows;
}
const addUserAnswer = async (userId, qId, oId) => {
    await sql`
        INSERT INTO question_answers (user_id, question_id, question_answer_option_id)
        VALUES (${userId}, ${qId}, ${oId})
    `;
}
const addAnswerOption = async (qId, optionText, isCorrect) => {
    await sql`
        INSERT INTO question_answer_options (question_id, option_text, is_correct)
        VALUES (${qId}, ${optionText}, ${isCorrect})
    `;
}

const getCorrectOption = async (qId) => {
    const rows = await sql`
        SELECT option_text
        FROM question_answer_options
        WHERE question_id = ${qId} AND is_correct = true
    `;
    return rows;
}
const deleteAnswer = async (id) => {
    await sql.begin(async (trx) => {
        await trx`
            DELETE FROM question_answers
            WHERE question_answer_option_id = ${id}
        `;
        await trx`
            DELETE FROM question_answer_options
            WHERE id = ${id};
        `;
    });
};


export {
    getTopics,
    getTopic,
    getRandomQuiz,
    getQuestion,
    getOptions,
    getSelectedOption,
    addUserAnswer,
    addAnswerOption,
    getCorrectOption,
    deleteAnswer
}