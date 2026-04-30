const Joi = require('joi');

const createRepasSchema = Joi.object({
  eleveId: Joi.number().integer().positive().required().messages({
    'number.base': 'L\'identifiant de l\'élève doit être un entier.',
    'any.required': 'L\'identifiant de l\'élève est obligatoire.',
  }),
  menuId: Joi.number().integer().positive().required().messages({
    'number.base': 'L\'identifiant du menu doit être un entier.',
    'any.required': 'L\'identifiant du menu est obligatoire.',
  }),
  dateService: Joi.date().iso().max('now').required().messages({
    'date.base': 'La date de service doit être une date valide.',
    'date.max': 'La date de service ne peut pas être dans le futur.',
    'any.required': 'La date de service est obligatoire.',
  }),
  statut: Joi.string().valid('SERVI', 'ABSENT').default('SERVI').optional(),
});

module.exports = { createRepasSchema };
