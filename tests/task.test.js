jest.setTimeout(20000);


const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');

// POST - CREATE TASK
describe('POST /api/tasks', () => {
  it('should create a new task with valid data', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Test task',
        description: 'Testing task creation',
        category: 'Test',
        priority: 'Low',
        deadline: '2099-12-31'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('task');
    expect(res.body.task.title).toBe('Test task');
  });

  it('should return 400 for invalid data', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({
        title: '',
        category: '',
        priority: 'Urgent',
        deadline: 'invalid-date'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
  });
});

//GET - READ ALL TASKS
describe('GET /api/tasks/:id', () => {
  it('should return a task by id (happy path)', async () => {
    const create = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Test task',
        description: 'Testing task creation',
        category: 'Test',
        priority: 'Low',
        deadline: '2099-12-31'
      });
    const id = create.body.task._id;

    const res = await request(app).get(`/api/tasks/${id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body._id).toBe(id);
  });

  it('should return 400 when id is NaN', async () => {
    const res = await request(app).get('/api/tasks/abc'); 
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
  });
});

describe('PUT /api/tasks/:id', () => {
  it('should update a task (happy path)', async () => {
    const create = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Old title',
        description: 'To be updated',
        category: 'Test',
        priority: 'Low',
        deadline: '2099-12-31'
      });
    const id = create.body.task._id;

    const res = await request(app)
      .put(`/api/tasks/${id}`)
      .send({
        title: 'New title',
        priority: 'High'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('task');
    expect(res.body.task.title).toBe('New title');
    expect(res.body.task.priority).toBe('High');
  });
});

describe('DELETE /api/tasks/:id', () => {
  it('should return 400 when id is NaN (validation)', async () => {
    const res = await request(app).delete('/api/tasks/xyz'); 
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
  });

  it('should delete a task (happy path)', async () => {
    const create = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Delete me',
        description: 'For DELETE test',
        category: 'Test',
        priority: 'Low',
        deadline: '2099-12-31'
      });
    const id = create.body.task._id;

    const res = await request(app).delete(`/api/tasks/${id}`);
    expect(res.statusCode).toEqual(200); 
    expect(res.body).toHaveProperty('message', 'Task deleted successfully'); //tambahan
  });
});
