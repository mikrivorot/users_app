// src/users/dto/update-user.dto.ts
import { IsString, IsOptional, IsEnum, MinLength } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: "john_doe",
    description: "Unique pseudonym for the user",
  })
  @IsString()
  @IsOptional()
  pseudonyme?: string;

  @ApiPropertyOptional({
    example: "John Doe",
    description: "Full name of the user",
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: "123 Main St, City, Country",
    description: "Address of the user",
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    example: "Optional comment about the user",
    description: "Any comment about the user",
  })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiPropertyOptional({
    example: "password123",
    description: "Password for the user (at least 6 characters)",
  })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({
    example: "non-admin",
    description: "User type, can be admin or non-admin",
  })
  @IsEnum(["admin", "non-admin"], {
    message: "User type must be admin or non-admin",
  })
  @IsOptional()
  userType?: string;
}
