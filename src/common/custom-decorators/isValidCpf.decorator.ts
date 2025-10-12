import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsValidCpf(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidCpf',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;

          const cpf = value.replace(/\D/g, '');
          if (cpf.length !== 11) return false;

          if (/^(\d)\1{10}$/.test(cpf)) return false;

          const calcCheckDigit = (cpfArray: string[], factor: number) => {
            let total = 0;
            for (let i = 0; i < cpfArray.length; i++) {
              total += parseInt(cpfArray[i], 10) * factor--;
            }
            const rest = total % 11;
            return rest < 2 ? 0 : 11 - rest;
          };

          const numbers = cpf.split('');
          const digit1 = calcCheckDigit(numbers.slice(0, 9), 10);
          const digit2 = calcCheckDigit(numbers.slice(0, 10), 11);

          return digit1 === parseInt(numbers[9], 10) && digit2 === parseInt(numbers[10], 10);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} inválido`;
        },
      },
    });
  };
}
