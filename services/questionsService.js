import { sql } from "../database/database.js";

const listQuestions = async () => {
    const rows = await sql` 
        SELECT question_text 
        FROM questions 
        ORDER BY id ASC
    `;
    return rows;
};

const getQuestionsbyTopicId = async (topicId) => {
    const rows = await sql` 
        SELECT id, question_text 
        FROM questions 
        WHERE topic_id = ${topicId} 
        ORDER BY id ASC
    `;
    return rows;
};

const getQuestionsbyQuestionId = async (qId) => {
    const rows = await sql` 
        SELECT id, question_text 
        FROM questions 
        WHERE id = ${qId} 
     `;
    return rows;
};

const addQuestionToTopic  = async (topicId, userId, text) => {
    await sql` 
        INSERT INTO questions (topic_id, user_id, question_text) 
        VALUES (${topicId}, ${userId}, ${text})
    `;
};

const deleteQuestion = async (id) => {
    await sql.begin(async (trx) => {

        await trx`
            DELETE FROM question_answers
            WHERE question_answer_option_id IN (
                SELECT id
                FROM question_answer_options
                WHERE question_id = ${id}
            )
        `;
        await trx`
            DELETE FROM question_answer_options
            WHERE question_id = ${id};
        `;
        await trx`
            DELETE FROM questions 
            WHERE id = ${id};
        `;
    });
};

const createAnswerOption = async (qId, optionText, isCorrect) => {
    await sql`
        INSERT INTO question_answer_options (question_id, option_text, is_correct) 
        VALUES (${qId}, ${optionText}, ${isCorrect})
    `;
};

const removeAnswerOption = async (qId) => {
    await sql.begin(async (trx) => {
        await trx`
            DELETE FROM question_answers
            WHERE question_id = ${qId}
        `;
        await trx`
            DELETE FROM question_answer_options
            WHERE id = ${qId}
        `;
    });
};

export { listQuestions, 
    getQuestionsbyTopicId, 
    getQuestionsbyQuestionId, 
    addQuestionToTopic, 
    deleteQuestion, 
    createAnswerOption, 
    removeAnswerOption 
}
