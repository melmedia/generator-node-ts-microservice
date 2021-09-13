import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum <%= entityName %>Status {
  Active = 'active',
  Deleted = 'deleted',
}

@Entity()
export class <%= entityName %> {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public email!: string;

  @Column()
  public firstName?: string;

  @Column()
  public lastName!: string;

  @Column()
  public isDraft!: boolean;

  @Column()
  public status!: <%= entityName %>Status;

  @Column()
  public creationTime!: Date;

  @Column()
  public updateTime!: Date;
}
