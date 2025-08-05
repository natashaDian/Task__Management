const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().allow('', null),
  category: Joi.string().min(1).required(),
  priority: Joi.string().valid('Low', 'Medium', 'High').required(),
  deadline: Joi.date().iso().greater('now').required()
});

module.exports = taskSchema;
