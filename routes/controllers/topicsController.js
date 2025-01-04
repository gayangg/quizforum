import * as topicsService from '../../services/topicsService.js';
import * as formValidation from "../../utils/validation.js";


const listTopics = async ({ render , user}) => {
  const errors = [];
  console.log('user', user)
  render("topics.eta", { errors, topics: await topicsService.getTopics() , user});
};

const listTopicsbyId = async ({ render, params, user }) => {
  const {id:topicId} = params;
   console.log('user', user)
  render("topic-questions.eta", { topic: await topicsService.getTopicbyId(topicId) , user});
};

const addTopic = async ({ request, response, user, render }) => {
  const current_user = 93;//user;
  console.log("current_user >>>>>>>>>>", current_user)
  const body =  request.body({ type: "form" });
  const params = await body.value;
  const topicName = params.get("name").trim();
  const errors = [];
  
  // if (!user || !user.isAdmin) {
  //   response.status = 403;
  //   return;
  // }
  console.log("topicName", topicName)
  
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

  await topicsService.addTopic( current_user,  topicName );
  response.redirect('/topics');
};

const deleteTopic = async ({ params, response, user }) => {
  // if (!user || !user.admin) {
  //   response.status = 403;
  //   return;
  // }

  const {id} = params;
  await topicsService.deleteTopic(id);
  response.redirect('/topics');
};



export { listTopics, listTopicsbyId, addTopic, deleteTopic }