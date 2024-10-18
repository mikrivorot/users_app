// src/users/dto/create-user.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: "Unique pseudonym for the user",
  })
  @IsString()
  @IsNotEmpty()
  pseudonyme: string;

  @ApiProperty({ description: "Full name of the user" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Address of the user",
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: "Any comment about the user",
  })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({
    description: "Password for the user (at least 6 characters)",
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: "User type, can be admin or non-admin",
  })
  @IsEnum(["admin", "user"], {
    message: "User type must be admin or non-admin",
  })
  @IsOptional()
  userType?: string;
}
