import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { MessagesHelper } from 'src/shared/helpers';
import { RegexHelper } from 'src/shared/helpers/regex.helper';

export class UpdateUserDto {
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
}
