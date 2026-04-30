const Joi = require('joi');

const createMenuSchema = Joi.object({
  date: Joi.date().iso().required().messages({
    'date.base': 'La date doit être une date valide.',
    'date.format': 'La date doit être au format ISO (YYYY-MM-DD).',
    'any.required': 'La date est obligatoire.',
  }),
  intitule: Joi.string().min(2).max(200).required().messages({
    'string.empty': 'L\'intitulé est obligatoire.',
    'any.required': 'L\'intitulé est obligatoire.',
  }),
  type: Joi.string().valid('DEJEUNER', 'GOUTER').required().messages({
    'any.only': 'Le type doit être DEJEUNER ou GOUTER.',
    'any.required': 'Le type est obligatoire.',
  }),
  cuisinierId: Joi.number().integer().positive().required().messages({
    'number.base': 'L\'identifiant du cuisinier doit être un entier.',
    'any.required': 'L\'identifiant du cuisinier est obligatoire.',
  }),
  portionsPrevues: Joi.number().integer().min(1).required().messages({
    'number.min': 'Les portions prévues doivent être supérieures à 0.',
    'any.required': 'Les portions prévues sont obligatoires.',
  }),
});

const updateMenuSchema = Joi.object({
  date: Joi.date().iso().optional(),
  intitule: Joi.string().min(2).max(200).optional(),
  type: Joi.string().valid('DEJEUNER', 'GOUTER').optional(),
  cuisinierId: Joi.number().integer().positive().optional(),
  portionsPrevues: Joi.number().integer().min(1).optional(),
}).min(1);

module.exports = { createMenuSchema, updateMenuSchema };
