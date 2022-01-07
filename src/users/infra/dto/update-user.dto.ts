import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { MessagesHelper } from '../../../shared/helpers';
import { RegexHelper } from '../../../shared/helpers/regex.helper';

export class UpdateUserDto {
  @IsNumber()
  @IsOptional()
  id: number;

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
  password: string;

  @IsNotEmpty()
  phoneNumber: string;
}
