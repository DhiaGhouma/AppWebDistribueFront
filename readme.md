# ⭐ Rating Skill Microservice

## Overview

The **Rating Skill Microservice** is part of the Skill Exchange Platform and is responsible for handling all user skill rating operations. It allows users to rate skills, retrieve skill ratings, and manage rating data. This microservice interacts with other services such as User and Skill microservices to provide a seamless experience.

## Features

- Add a rating to a skill by a user
- Update or delete an existing rating
- Retrieve average ratings for specific skills
- Fetch all ratings by user or skill
- Validate data consistency with external services

## Architecture

This microservice follows a **microservice architecture** with the following components:

- **Model Layer:** Defines the `Rating`, `User`, and `Skill` entities.
- **Repository Layer:** Interfaces with the database.
- **Service Layer:** Contains the business logic.
- **Controller Layer:** Handles HTTP requests and responses.

## Technologies Used

- Java / Spring Boot
- Spring Data JPA
- RESTful APIs
- PostgreSQL / MongoDB (depending on configuration)
- Lombok
- Swagger/OpenAPI for API documentation
- Docker (for containerization)

## API Endpoints

| Method | Endpoint                        | Description                               |
|--------|----------------------------------|-------------------------------------------|
| POST   | `/api/ratings`                  | Create a new rating                       |
| GET    | `/api/ratings`                  | Get all ratings                           |
| GET    | `/api/ratings/user/{userId}`    | Get all ratings by a specific user        |
| GET    | `/api/ratings/skill/{skillId}`  | Get all ratings for a specific skill      |
| PUT    | `/api/ratings/{ratingId}`       | Update a rating                           |
| DELETE | `/api/ratings/{ratingId}`       | Delete a rating                           |
| GET    | `/api/ratings/average/{skillId}`| Get average rating of a specific skill    |

## Example JSON Payload

```json
{
  "userId": "12345",
  "skillId": "abcde",
  "rating": 4.5,
  "comment": "Very helpful and well-explained!"
}
