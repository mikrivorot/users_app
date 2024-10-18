// src/users/dto/update-user.dto.ts
import { IsString, IsOptional, IsEnum, MinLength } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: "Unique pseudonym for the user",
  })
  @IsString()
  @IsOptional()
  pseudonyme?: string;

  @ApiPropertyOptional({
    description: "Full name of the user",
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: "Address of the user",
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    description: "Any comment about the user",
  })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiPropertyOptional({
    description: "Password for the user (at least 6 characters)",
  })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({
    description: "User type, can be admin or non-admin",
  })
  @IsEnum(["admin", "user"], {
    message: "User type must be admin or non-admin",
  })
  @IsOptional()
  userType?: string;
}
