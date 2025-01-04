import * as topicsService from '../../services/topicsService.js';
import * as formValidation from "../../utils/validation.js";

const listTopics = async ({ render , user}) => {
  const errors = [];
  console.log('user', user)
  render("topics.eta", { errors, topics: await topicsService.getTopics() , user});
};

const listTopicsbyId = async ({ render, params }) => {
  const {id:topicId} = params;
  render("topic-questions.eta", { topics: await topicsService.getTopicbyId(topicId) });
};

const addTopic = async ({ request, response, user, render }) => {
  const current_user = user.id;
  console.log("current_user >>>>>>>>>>", current_user)
  const body =  request.body({ type: "form" });
  const params = await body.value;
  const topicName = params.get("name").trim();
  const errors = [];
  
  // if (!user || !user.isAdmin) {
  //   response.status = 403;
  //   return;
  // }

  if (!formValidation.length(topicName, { minLength: 1 })) {
    errors.push("Topic name must not be empty");
  }

  const existingTopic = await topicsService.checkTopicbyName(topicName);
  if (existingTopic.length > 0) {
    errors.push("Topic name already exists. Please choose another name." );
  }

  if (errors.length > 0) {
    render("topics.eta", { errors, topics: await topicsService.getTopics() });
    return;
  }

  await topicsService.addTopic( current_user,  params.get("name") );
  response.redirect('/topics');
};

const deleteTopic = async ({ params, response, user }) => {
  // if (!user || !user.isAdmin) {
  //   response.status = 403;
  //   return;
  // }

  const {id} = params;
  await topicsService.deleteTopic(id);
  response.redirect('/topics');
};

const getTopicsWithPagination = async ({request, response, render}) => {
    const page = parseInt(request.query, 3) || 1; // Current page (default to 1)
    const itemsPerPage = 10; // Number of topics per page

    const offset = (page - 1) * itemsPerPage;

    try {
        // Get the total number of topics
      const totalResult = await topicsService.getTotalCount()
      console.log(">>>>>>>>>>", totalResult)
        const totalItems = parseInt(totalResult.rows[0].total, 10);

        // Fetch topics for the current page
        const topicsResult = await topicsService.getResultCount(itemsPerPage, offset);
        const topics = topicsResult.rows;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        render("topics", {
            topics,
            currentPage: page,
            totalPages,
        });
    } catch (error) {
        console.error("Error fetching topics:", error);
        ///response.status(500).send("Internal Server Error");
    }
};

export { listTopics, listTopicsbyId, addTopic, deleteTopic, getTopicsWithPagination }