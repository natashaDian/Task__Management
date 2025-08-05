jest.setTimeout(20000);


const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');


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
