import { ParseUUIDPipe } from '@nestjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: ParseUUIDPipe;

  @Column({
    nullable: false,
  })
  url: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  size: string;

  @Column()
  createdAt: Date;

  @Column({
    nullable: true,
  })
  updatedAt: Date;
}
