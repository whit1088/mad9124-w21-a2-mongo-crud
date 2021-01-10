MAD9124 Mobile API Development

# Assignment 2 - Mongo CRUD

## The brief

This is the second of three take home assignments related to building a backend web service to support a simple class list application called _cListR_.

In the previous assignment you built the base for the _cListR_ RESTful API using Node.js and the Express framework. For this assignment you will enhance that base application to use MongoDB for data persistence and add measures to sanitize incoming data.

## Core Requirements

1. Using the Express.js framework, the API will expose a full set of CRUD routes (six, including both `put` and `patch`) for each of two resources: **students**, and **courses**. All API resource paths must begin with `/api`.

2. Resource collections will be stored in MongoDB and accessed via Mongoose Model classes. The `Model.schema` for the resource objects will have the following properties.

#### Student

| Property  | Type   |
| --------- | ------ |
| firstName | String |
| lastName  | String |
| nickName  | String |
| email     | String |

#### Course

| Property    | Type   |
| ----------- | ------ |
| code        | String |
| title       | String |
| description | String |
| url         | String |
| students    | Array  |

<br/>

**Remember:** The MongoDB driver will automatically assign the `_id` property.

3. The `students` property of the Course model should be an array of object ids referencing the Student model.

4. Each resource should have its own [Router module](https://expressjs.com/en/4x/api.html#router).

5. Routes related to individual members of a resource collection should use a validation function which will return a properly formatted 404 response with an errors array for any invalid `req.params.id` value.

6. All client supplied data (i.e. the `req.body` object) should be sanitized before being stored in the database. This should include guarding against cross site scripting (XSS) and query injection attacks.

7. Ensure that you write clean and readable code. Pay attention to:

- no runtime errors
- consistent 2 space indentation
- logical grouping of related code
- semantically descriptive names for variables and functions
- well organized project folder structure
- properly formatted `package.json` file
  - correct project name
  - your author details

## Logistics

- Fork the repo and then clone it to your latptop.
- Build the project on your laptop.
- Test each route with Postman.
- Make git commits as you complete each requirement
- When everything is complete, push the final commit back up to GitHub and submit the GitHub repo's URL on Birghtspace.
