import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueConstraint implements ValidatorConstraintInterface {
  constructor(private dataSource: DataSource) {}
  async validate(value: any, args: ValidationArguments) {
    const entity = args.object[`class_entity_${args.property}`];
    if (!value) {
      return true;
    }
    const isExists = await this.dataSource.manager.findOneBy(entity, {
      [args.property]: value,
    });
    if (isExists) {
      return false;
    }
    {
      return true;
    }
  }
  defaultMessage(args?: ValidationArguments): string {
    return `${args.property} already exists.`;
  }
}

export function Unique(
  entity: Function,
  validationOptions?: ValidationOptions,
) {
  validationOptions = {
    ...validationOptions,
  };
  return function (object: Object, propertyName: string) {
    object[`class_entity_${propertyName}`] = entity;
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueConstraint,
    });
  };
}
