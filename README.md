# School API
A RESTful API built using Node.js and Express.js to manage school data with location coordinates.  
The project is connected to a MySQL database hosted on Railway and deployed on Render.

## Features
- Add a school
- Get all schools

## Tech Stack
- Node.js
- Express.js
- MySQL (Railway)
- Render (Deployment)
- Postman (API Testing)

## Setup Instructions
1. Clone the repository: git clone https://github.com/Tannu1123/school-api.git
2. Install Dependencies: npm install
3. Run the server: node server.js

## API Endpoints
- GET /listSchools?latitude= longitude=  - get all schools with distance from user's co-ordinates
- POST /addSchool - add a new school

## Postman Collection
You can access the Postman collection for this API here:
https://github.com/Tannu1123/school-api/blob/main/postman_collection.json

### How to use:
1. Open Postman
2. Click on **Import**
3. Upload the downloaded `postman_collection.json`
4. Start testing the API endpoints


## Live API
https://school-api-r9a6.onrender.com/listSchools?latitude=19.07&longitude=72.87
