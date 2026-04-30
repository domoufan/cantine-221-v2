const Joi = require('joi');

const createEleveSchema = Joi.object({
  prenom: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Le prénom est obligatoire.',
    'any.required': 'Le prénom est obligatoire.',
  }),
  nom: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Le nom est obligatoire.',
    'any.required': 'Le nom est obligatoire.',
  }),
  classe: Joi.string().min(1).max(20).required().messages({
    'string.empty': 'La classe est obligatoire.',
    'any.required': 'La classe est obligatoire.',
  }),
  regimeAlimentaire: Joi.string()
    .valid('NORMAL', 'VEGETARIEN', 'SANS_GLUTEN')
    .required()
    .messages({
      'any.only': 'Le régime alimentaire doit être NORMAL, VEGETARIEN ou SANS_GLUTEN.',
      'any.required': 'Le régime alimentaire est obligatoire.',
    }),
  telephoneParent: Joi.string().pattern(/^\+?[0-9\s\-]{7,15}$/).required().messages({
    'string.pattern.base': 'Le téléphone du parent doit être un numéro valide.',
    'string.empty': 'Le téléphone du parent est obligatoire.',
    'any.required': 'Le téléphone du parent est obligatoire.',
  }),
});

const updateEleveSchema = Joi.object({
  prenom: Joi.string().min(2).max(50).optional(),
  nom: Joi.string().min(2).max(50).optional(),
  classe: Joi.string().min(1).max(20).optional(),
  regimeAlimentaire: Joi.string().valid('NORMAL', 'VEGETARIEN', 'SANS_GLUTEN').optional(),
  telephoneParent: Joi.string().pattern(/^\+?[0-9\s\-]{7,15}$/).optional(),
}).min(1).messages({
  'object.min': 'Au moins un champ doit être fourni pour la mise à jour.',
});

module.exports = { createEleveSchema, updateEleveSchema };
