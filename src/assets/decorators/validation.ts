import { applyDecorators } from '@nestjs/common';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

/**
 * Adds IsOptional to decorator apply list;
 * @param decorators
 * @constructor
 */
const OptionalField = (...decorators: Parameters<typeof applyDecorators>) => {
  return applyDecorators(IsOptional(), ...decorators);
};

/**
 * Validates string that can be optional.
 * @constructor
 */
export const OptionalString = () => {
  return OptionalField(IsString());
};

/**
 * Validates boolean that can be optional.
 * @constructor
 */
export const OptionalBoolean = () => {
  return OptionalField(IsBoolean());
};

/**
 * Validates number that can be optional.
 * @constructor
 */
export const OptionalNumber = () => {
  return OptionalField(IsNumber());
};

/**
 * Validates enum that can be optional.
 * @constructor
 */
export const OptionalEnum = (...params: Parameters<typeof IsEnum>) => {
  return OptionalField(IsEnum(...params));
};
