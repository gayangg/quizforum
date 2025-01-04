# Introduction

Shopping list build using Deno, Js and PostgreSQL.
The API allows users to perform CRUD operations on shopping list. 
live url : https://shopping-lists-7kqg.onrender.com

## Technologies
- Deno serve
- Javascript
- PostgreSQL
- Jest

## Project structure

```
├── database
│   └── database.js
├── middlewares
│   ├── errorMiddleware.js
│   ├── renderMiddleware.js
│   └── serveStaticMiddleware.js
├── routes
│   ├── apis
│   ├── controllers
│   │   └── mainController.js
│   └── routes.js
├── flyway
│   └── sql
│       └── V1_initial_database
├── services
│   ├── itemService
│   └── listService
├── utils
│   └── requestUtils
├── views
│   ├── layouts
│   │   └── layout
│   ├── partials
│   ├── main
│   └── lists
├── test
│   ├── ..
│   ├── ..
│   └── services
├── app.js
└── deps.js
```

## Getting started

1. Clone this repo with 
2. Install project dependencies using 
3. Run the app with 

## Running tests
- 