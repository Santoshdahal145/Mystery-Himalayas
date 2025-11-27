import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdatePhoneDto {
  @IsNotEmpty()
  @IsString()
  countryCode: string; // "+977", "+91", etc.

  @IsNotEmpty()
  @IsString()
  @Length(7, 15)
  phoneNumber: string;
}
