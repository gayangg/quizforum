import { assertEquals } from "../deps.js"; 
import * as topicsService  from "../services/topicsService.js";
import * as questionsService  from "../services/questionsService.js";
import * as askingQuizService  from "../services/askingQuizService.js";
import * as authService  from "../services/authService.js";
import * as answersService from "../services/answersService.js";

createOption
Deno.test("Unit Test - Add Topic", async () => {
  const result = await topicsService.addTopic("Test Topic");
  assertEquals(result.success, true);
  assertEquals(result.message, "Topic added successfully");
});

Deno.test("Unit Test - Delete Topic", async () => {
  const result = await topicsService.deleteTopic(1); // Assuming topic ID 1 exists
  assertEquals(result.success, true);
  assertEquals(result.message, "Topic deleted successfully");
});

Deno.test("Unit Test - Add Question to Topic", async () => {
  const result = await questionsService.addQuestionToTopic(1, ">>Which of the following defines the Cookie visibility?");
  assertEquals(result.success, true);
  assertEquals(result.message, "Question added successfully");
});

Deno.test("Unit Test - Delete Question from Topic", async () => {
  const result = await questionsService.deleteQuestion(88, 120); // Assuming topic ID 188, question ID 120
  assertEquals(result.success, true);
  assertEquals(result.message, "Question deleted successfully");
});

Deno.test("Unit Test - Add Answer Option ", async () => {
  const result = await answersService.createOption(120, ">>LocalStorage added as option for question", true); // Assuming question ID 120
  assertEquals(result.success, true);
  assertEquals(result.message, "Answer option added successfully");
});
