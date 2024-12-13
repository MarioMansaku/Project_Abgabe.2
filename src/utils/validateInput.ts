import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export async function validateInput<T extends object>(dtoClass: new () => T, plainObject: object): Promise<T> {
  const instance = plainToInstance(dtoClass, plainObject);
  const errors = await validate(instance);

  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => Object.values(error.constraints || {}).join(', '))
      .join('; ');
    throw new Error(`Validation failed: ${errorMessages}`);
  }
  return instance;
}
