# Task Management API

This is a simple **Task Management System** built with Node.js, Express, MongoDB, and Swagger for API documentation.

## 🔧 Features

- Create, Read, Update, Delete (CRUD) tasks
- Filter tasks by category, priority, and deadline range
- Sort tasks by creation date, priority, or deadline
- Data validation (Joi)
- Proper error handling (400, 404, 500)
- Unit testing with Jest & Supertest
- API documentation via Swagger UI

## 🧪 Tech Stack

- Node.js  
- Express.js (framework)
- MongoDB (Mongoose)  
- Joi (validation)  
- Jest & Supertest (testing)  
- Swagger UI (API documentation)

## 📦 How to install my code
1. Clone the Repo with :
   git clone https://github.com/natashaDian/Task__Management
   cd Task__Management
2. Install dependencies :
   npm install
3. Configure the environment by :
   Create `.env` file and write this code
    ```
    PORT=4000
    MONGODB_URI=mongodb://localhost:27017/taskdb
    ```
4. Start mongoDB locally (here i use mongodb-community@7.0 please check yours)
   bash this :
   `brew services start mongodb-community@7.0`
5. Run the server by write this in your terminal : npm run dev
   Server will runs at : `http://localhost:4000`

## API Documentation

  Swagger UI available at:
  ```
  http://localhost:4000/api-docs
  ```

It lists and allows testing of:
- `POST /api/tasks`
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Testing Analysis [Create Read Update Delete]
This project uses **Jest** and **Supertest** for unit testing.
### Tested Features
1. ✅ Successful post task creation, get task, get task by id, put and delete by the id
2. ✅ Rejection of invalid task data
3. ✅ Error handling logic [400, 404, 500]

### Run test
Bashing this in other terminal
npm test
Make sure MongoDB is running before testing. 

## Commit Message Formatting
Use the following format when committing:

```
feat(talent-growth): Describe your change here
```
Example:

```
feat(talent-growth): Add POST /tasks endpoint
```

## Author
Natasha Dian Mahardita
[https://github.com/natashaDian]











