import { Exclude, Expose, Type } from 'class-transformer';
import { IsDate, IsEmail, IsIn, IsOptional } from 'class-validator';
import { ErrorMessages } from '../../components/validation/ErrorMessages';

@Exclude()
export class Update<%= entityName %>Form {
  @Expose()
  public firstName?: string;

  @Expose()
  public lastName?: string;

  @Expose()
  @IsIn(['f', 'm'])
  @IsOptional()
  public gender?: string;

  @Expose()
  @Type(() => Date)
  @IsDate({ message: ErrorMessages.isDate() })
  @IsOptional()
  public birthDate?: Date;

  @Expose()
  @IsEmail({}, { message: ErrorMessages.isEmail() })
  @IsOptional()
  public email?: string;

}
