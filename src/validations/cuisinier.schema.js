const Joi = require('joi');

const createCuisinierSchema = Joi.object({
  prenom: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Le prénom est obligatoire.',
    'string.min': 'Le prénom doit contenir au moins 2 caractères.',
    'any.required': 'Le prénom est obligatoire.',
  }),
  nom: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Le nom est obligatoire.',
    'any.required': 'Le nom est obligatoire.',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'L\'email doit être valide.',
    'string.empty': 'L\'email est obligatoire.',
    'any.required': 'L\'email est obligatoire.',
  }),
  telephone: Joi.string().pattern(/^\+?[0-9\s\-]{7,15}$/).optional().messages({
    'string.pattern.base': 'Le téléphone doit être un numéro valide.',
  }),
  specialite: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'La spécialité est obligatoire.',
    'any.required': 'La spécialité est obligatoire.',
  }),
});

const updateCuisinierSchema = Joi.object({
  prenom: Joi.string().min(2).max(50).optional(),
  nom: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().optional(),
  telephone: Joi.string().pattern(/^\+?[0-9\s\-]{7,15}$/).optional(),
  specialite: Joi.string().min(2).max(100).optional(),
}).min(1).messages({
  'object.min': 'Au moins un champ doit être fourni pour la mise à jour.',
});

module.exports = { createCuisinierSchema, updateCuisinierSchema };
