# Comments Backend Application

This is a backend application for managing comments.

## Deployment and Swagger Documentation:
[https://talkboard.yurgo.site/api-docs](https://talkboard.yurgo.site/api-docs)

## Stack:
- NestJS
- Express
- TypeORM (PostgreSQL)
- Cloudinary

## Main Functionality:
- User registration and authorization
- Adding comments
- Fetching comments in a nested list

## Environment Configuration:
`.env` file should be added separately and placed in `<root project folder>./talkboard-app`

## Installation and Running:
```bash
cd <root project folder>
docker-compose build
docker-compose up -d
