import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum <%= entityName %>Status {
  AutoCoaching = 'autoCoaching',
  Survey = 'survey',
  PreEating = 'preEating',
  Eating = 'eating',
  PreCoaching = 'preCoaching',
  Coaching = 'coaching',
}


@Entity()
export class <%= entityName %> {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public email!: string;

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Column()
  public coachId?: number;

  @Column()
  public nutritionistId?: number;

  @Column()
  public status!: Status;

  @Column()
  public creationTime!: Date;

  @Column()
  public updateTime!: Date;
}
