import * as authService from '../../services/authService.js';
import * as formValidation from "../../utils/validation.js";
import { bcrypt } from "../../deps.js";


const showRegistrationForm = ({ render }) => {
  render("register.eta");
}

const handleRegisteration = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const formData = await body.value;
  const email = formData.get("email");
  const password = formData.get("password");
  const errors = [];
  //console.log("email:", email, "password:", password)


  if (!formValidation.email(email)) {
    errors.push("Invalid email format.");
  }
  if (!formValidation.length(password, { minLength: 4 })) {
    errors.push("Password must be at least 4 characters long.");
  }
  if (errors.length > 0) {
    render("register.eta", { errors, email, password });
    return;
  }

  const existingEmail = await authService.getUserByEmail(email);
  //console.log("existingEmail", existingEmail)
  if (existingEmail !== null && existingEmail.email) {
    errors.push("Email already exists.");  
  }   
  
  if (errors.length > 0) {
    render("register.eta", { errors, email, password: await bcrypt.hash(password)});
    return;
  }
  
  await authService.addUser(email, password);
  response.redirect('/auth/login');
  
};

const showLoginForm = ({ render}) => {
  render("login.eta", { errors: null, email: "", password: "" });
};


// const handleLogin = async ({request, response, render, state, user}) => {
//   const body = request.body({ type: "form" });
//   const params = await body.value;
//   const email = params.get("email");
//   const password = params.get("password");
//   const errors = [];


//     try {
//       //const user = await authService.authenticateUser(email, password);
//       //console.log("user:", user);
//        // if (user) {
//           await state.session.set("user", {id: 93 , email:"admin@admin.com", admin:true});
//           response.redirect("/topics");
        
//     } catch (error) {
//         console.error("Error during login:", error);
//     }
// };



const handleLogin = async ({request, response, render, state}) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const email = params.get("email");
  const password = params.get("password");
  const errors = [];

  if (!email || !password) {
    errors.push("Both email and password are required.");
    return render("login", { errors, email, password });
  }

    try {
      const user = await authService.authenticateUser(email, password);
      console.log("user:", user);
        if (user) {
          await state.session.set("user", user);
          response.redirect("/topics");
        } else {
            errors.push("Invalid email or password.");
            render("login.eta", { errors, email, password});
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
};

const login = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const email = params.get("email")//.trim();
  const password = params.get("password")//.trim();
  const errors = [];
  const user = await authService.authenticateUser(email, password);
  if (!user) {
    //response.body = { error: 'Invalid credentials' };
    //return;
    errors.push("Invalid credentials");
  }
  render("login.eta", { errors, email, password });
  //response.redirect('/');
};

const handleLogout = async ({ response , state}) => {
  state.session.set("user", null)
  response.redirect('/auth/login');
};

export { showRegistrationForm, handleRegisteration, showLoginForm, handleLogin, login, handleLogout }