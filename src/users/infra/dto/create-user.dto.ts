import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { MessagesHelper } from 'src/shared/helpers';
import { RegexHelper } from 'src/shared/helpers/regex.helper';

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
}
