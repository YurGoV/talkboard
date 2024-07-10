import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isValidXhtml } from './html-validator';

@ValidatorConstraint({ async: true })
export class IsValidHtmlConstraint implements ValidatorConstraintInterface {
  async validate(content: string) {
    const res = await isValidXhtml(content);
    return res;
  }

  defaultMessage() {
    return 'Invalid HTML content';
  }
}

export function IsValidHtml(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidHtmlConstraint,
    });
  };
}
