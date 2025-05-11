import { body, param } from 'express-validator';

class ContactValidator {
  static validateId() {
    return [
      param('id').isMongoId().withMessage('Invalid contact ID'),
    ];
  }

  static validateCreateContact() {
    return [
      body().custom((value, { req }) => {
        const allowedFields = ['name', 'email', 'phone'];
        const extraFields = Object.keys(req.body).filter(
          key => !allowedFields.includes(key)
        );
        if (extraFields.length > 0) {
          throw new Error(`Request has invalid fields: ${extraFields.join(', ')}`);
        }
        return true;
      }),
      body('name').isString().notEmpty().withMessage('Name is required'),
      body('email').isEmail().withMessage('Valid email is required'),
      body('phone')
        .isString().notEmpty().withMessage('Phone number is required')
        .matches(/^\+?[\d\-()]*\d[\d\-()]*$/)
        .withMessage('Phone number must contain at least one digit. Only digits, dashes, parentheses, and an optional leading plus sign are allowed'),
    ];
  }
}

export default ContactValidator;
