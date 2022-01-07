import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { MessagesHelper } from '../../../shared/helpers';
import { RegexHelper } from '../../../shared/helpers/regex.helper';
import { Address } from '../entities';

export class CreateUserDto {
  @Matches(RegexHelper.EMAIL, { message: MessagesHelper.EMAIL_VALID })
  @IsString()
  @IsNotEmpty()
  email: string;

  @Matches(RegexHelper.NAME, { message: MessagesHelper.NAME_VALID })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Matches(RegexHelper.PASSWORD, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  @IsNotEmpty()
  @MinLength(8, { message: MessagesHelper.MIN_LENGTH_VALID })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(RegexHelper.PHONE, {
    message: MessagesHelper.PHONE_VALID,
  })
  phoneNumber: string;

  @IsObject()
  @IsNotEmptyObject()
  @IsNotEmpty()
  address: Address;
}
