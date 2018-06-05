import { Exclude, Expose } from 'class-transformer';
import { ErrorMessages } from '../../components/validation/ErrorMessages';

import {
  IsInt,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';

@Exclude()
export class Create<%= entityName %> {
  @Expose()
  @IsNotEmpty({ message: ErrorMessages.isNotEmpty() })
  public firstName!: string;

  @Expose()
  @IsNotEmpty({ message: ErrorMessages.isNotEmpty() })
  public lastName!: string;

  @Expose()
  @IsEmail({}, { message: ErrorMessages.isEmail() })
  @IsNotEmpty({ message: ErrorMessages.isNotEmpty() })
  public email!: string;

  @Expose()
  @IsInt({ message: ErrorMessages.isInt() })
  @IsOptional()
  public coachId?: number;

  @Expose()
  @IsInt({ message: ErrorMessages.isInt() })
  @IsOptional()
  public nutritionistId?: number;

}
