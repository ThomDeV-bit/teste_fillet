import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { parse, isValid } from 'date-fns';

export function IsValidDate(format: string = 'dd/MM/yyyy', validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          const parsedDate = parse(value, format, new Date());
          return isValid(parsedDate);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve ser uma data válida no formato ${format}`;
        },
      },
    });
  };
}
