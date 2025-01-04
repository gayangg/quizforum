import { sql } from "../database/database.js";

const getOptionsByQuestion = async (questionId) => {
    const rows = await sql`
        SELECT id, option_text, is_correct 
        FROM question_answer_options  
        WHERE question_id = ${questionId} 
        ORDER BY id ASC
    `;
    return rows;
};

const createOption = async (qId, optionText, isCorrect) => {
    await sql`
        INSERT INTO question_answer_options (question_id, option_text, is_correct) 
        VALUES (${qId}, ${optionText}, ${isCorrect})
    `;
};

const removeOption = async (qId) => {
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

export { getOptionsByQuestion, createOption, removeOption}