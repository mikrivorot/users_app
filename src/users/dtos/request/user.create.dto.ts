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
    example: "john_doe",
    description: "Unique pseudonym for the user",
  })
  @IsString()
  @IsNotEmpty()
  pseudonyme: string;

  @ApiProperty({ example: "John Doe", description: "Full name of the user" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "123 Main St, City, Country",
    description: "Address of the user",
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    example: "Optional comment about the user",
    description: "Any comment about the user",
  })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({
    example: "password123",
    description: "Password for the user (at least 6 characters)",
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: "non-admin",
    description: "User type, can be admin or non-admin",
  })
  @IsEnum(["admin", "non-admin"], {
    message: "User type must be admin or non-admin",
  })
  @IsOptional()
  userType?: string;
}
