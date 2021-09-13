import { Exclude, Expose } from 'class-transformer';
import { ErrorMessages } from '../../components/validation/ErrorMessages';

import {
  IsNotEmpty,
  IsEmail,
  IsBoolean,
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
  @IsBoolean()
  public isDraft!: number;

}
