## Introduction

This project is a web application built using Deno, a modern runtime for JavaScript, along with the Oak web framework for handling routing and middleware.
The frontend leverages Bootstrap for responsive and visually appealing design, while JavaScript is used for dynamic client-side functionality. The application showcases efficient and secure server-side capabilities, incorporating features like user authentication, form validation, database interactions, and more.

live url : https://quizforum.onrender.com/

## Technologies
- Deno serve
- Oak web framework
- Javascript
- PostgreSQL

## Project structure

```
├── database
│   └── database.js
├── middlewares
│   ├── errorMiddleware.js
│   ├── renderMiddleware.js
│   └── serveStaticMiddleware.js
├── routes
│   ├── controllers                 
│   │   │── apiController.js
│   │   │── answersController.js
│   │   │── askingQuizController.js
│   │   │── authController.js
│   │   │── questionsController.js
│   │   └── topicsController.js
│   └── routes.js
├── flyway
│   └── sql
│       │── V1_initial_database
│       └── V2_add_user
├── services                        
│   ├── answerService
│   ├── apiService
│   ├── askingQuizService
│   ├── authService
│   ├── questionsService
│   ├── topicsService
│   └── userService
├── utils
│   └── validation
├── static
│   └── css
│       └── custom.css
├── views
│   ├── layouts
│   │   └── layout
│   ├── api
│   ├── login
│   ├── register
│   ├── ....
│   ├── topic-questions
│   └── topics
├── test
│   ├── endToEndTests
│   └── unitTests
├── .env
├── README.md
├── Dockerfile
├── docker-compose.yml
├── run-locally.js
└── deps.js
```

## Installation and Setup

1. Prerequisites 
    Deno installed.
    Docker (for PostgreSQL)

2. Clone the Repository 
    git clone <git@github.com:gayangg/quizforum.git>
    cd <name>

3. Configure Environment Variables
    Create a .env file in the project root with the following content:
    DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>

4. Start the Database with Docker
    docker-compose up -d

5. Run the Application
    deno run --allow-net --allow-read --allow-env run-locally.js

## Running tests
- 