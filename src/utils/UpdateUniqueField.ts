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
export class UniqueWithParamsConstraint
  implements ValidatorConstraintInterface
{
  constructor(private dataSource: DataSource) {}
  async validate(value: any, args: ValidationArguments) {
    console.log({ value, args });
    const exclude = args.constraints[0];
    const include = args.constraints[1];
    const entity = args.object[`class_entity_${args.property}`];
    if (!value) {
      return true;
    }
    // const data = await this.dataSource.manager.findOneBy(entity, {
    //   [args.property]: value,
    // });

    let queryBuilder = await this.dataSource
      .getRepository(entity)
      .createQueryBuilder()
      .where(`${args.property} = :${args.property}`, { [args.property]: value })
      .getOne();

    console.log({ queryBuilder });
    // if (exclude) {
    //   queryBuilder = queryBuilder.andWhere({ [exclude]: exclude });
    // }
    // const data = await queryBuilder.getOne();
    // console.log({ data, where: { [exclude]: exclude } });
    if (queryBuilder) {
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

export function UniqueWithParams(
  entity: Function,
  exclude?: string,
  include?: string,
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
      constraints: [exclude, include],
      validator: UniqueWithParamsConstraint,
    });
  };
}
