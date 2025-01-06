import { superoak } from "../deps.js"; 
import { app } from "../app.js"; 

Deno.test("Login Test - Valid Credentials", async () => {
  const request = await superoak(app);
  await request.post("/auth/login")
    .send({ email: "testuser@gmail.com", password: "password123" })
    .expect(302) // Redirect after successful login
    .expect("Location", "/topics");
});

Deno.test("Register Test - Valid User", async () => {
  const request = await superoak(app);
  await request.post("/auth/register")
    .send({ email: "newuser@gmail.com", password: "password123" })
    .expect(200); // Success response
});

Deno.test("Add Topic Test", async () => {
  const request = await superoak(app);
  await request.post("/topics")
    .send({ name: "New Topic" })
    .expect(302) // Redirect after successful topic creation
    .expect("Location", "/topics");
});

Deno.test("Delete Topic Test", async () => {
  const request = await superoak(app);
  await request.post("/topics/1/delete") // Assuming topic ID 1 exists
    .expect(302)
    .expect("Location", "/topics");
});

Deno.test("Add Question to Topic Test", async () => {
  const request = await superoak(app);
  await request.post("/topics/1/questions")
    .send({ question_text: "What is Deno?" })
    .expect(302)
    .expect("Location", "/topics/1/questions");
});
