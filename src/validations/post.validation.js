const Joi = require('joi');

const getModels = {
  query: Joi.object().keys({
    title: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
    limit: Joi.number().integer().optional(),
  }),
};

const createModel = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    imgSrc: Joi.string().optional(),
    content: Joi.string().required(),
    category: Joi.string().optional(),
  }),
};

const getModel = {
  params: Joi.object().keys({
    postId: Joi.string().required(),
  }),
};

const updateModel = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    imgSrc: Joi.string().optional(),
    content: Joi.string().required(),
    category: Joi.string().optional(),
  }),
};

const deleteModel = {
  params: Joi.object().keys({
    postId: Joi.string().required(),
  }),
}

module.exports = {
  deleteModel,
  getModels,
  createModel,
  getModel,
  updateModel,
};
