import { sql } from "../database/database.js";

const getTopics = async () => {
    const rows = await sql`
        SELECT id, name 
        FROM topics
        ORDER BY name ASC
    `;
    //console.log("Calling results:", rows);
    return rows;
};

const getTopicbyId = async (topicId) => {
    const rows = await sql`
        SELECT id, name 
        FROM topics
        WHERE id = ${topicId} 
    `;
    //console.log("Calling results:", rows);
    return rows;
};

const checkTopicbyName = async (topicName) => {
    const rows = await sql`
        SELECT * 
        FROM topics
        WHERE name = ${topicName}
    `;
    return rows;
};

const addTopic = async (userId, name) => {
    try {
        await sql`
            INSERT INTO topics (user_id, name)
            VALUES (${userId}, ${name})
        `;
    } catch (error) {
       return ({ error: "An error occurred while adding the topic." });
    }
};

const deleteTopic = async (id) => {
    await sql.begin(async (trx) => {

        await trx`
            DELETE FROM question_answers
            WHERE question_id IN (
                SELECT id
                FROM questions
                WHERE topic_id = ${id}
            )
        `;
        
        await trx`
            DELETE FROM questions
            WHERE topic_id = ${id}
        `;

        await trx`
            DELETE FROM topics
            WHERE id = ${id}
        `;
  });
};

const getTotalCount = async () => {
    const rows = await sql`
        SELECT COUNT(*) AS total
        FROM topics
    `;
    return rows;
}
const getResultCount = async (itemsPerPage, offset) => {
    const rows = await sql`
        SELECT * FROM topics 
        ORDER BY name ASC LIMIT ${itemsPerPage} OFFSET ${offset}
    `;
    return rows;
}

export { getTopics, getTopicbyId, checkTopicbyName, addTopic, deleteTopic, getTotalCount, getResultCount }