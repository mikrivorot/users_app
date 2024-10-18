import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty({
    description: "Unique pseudonym for the user",
  })
  pseudonyme: string;

  @ApiProperty({ description: "Full name of the user" })
  name: string;

  @ApiProperty({
    description: "Address of the user",
  })
  address?: string;

  @ApiProperty({
    description: "Optional comment about the user",
  })
  comment?: string;

  @ApiProperty({
    description: "User type (admin or non-admin)",
  })
  userType: string;
}
