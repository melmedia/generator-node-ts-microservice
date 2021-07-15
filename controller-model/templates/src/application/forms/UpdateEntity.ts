import { Exclude, Expose } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsOptional
} from 'class-validator';
import { ErrorMessages } from '../../components/validation/ErrorMessages';

@Exclude()
export class Update<%= entityName %> {
  @Expose()
  public firstName?: string;

  @Expose()
  public lastName?: string;

  @Expose()
  @IsEmail({}, { message: ErrorMessages.isEmail() })
  @IsOptional()
  public email?: string;

  @Expose()
  @IsBoolean()
  public isDraft!: number;

}
