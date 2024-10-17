import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty({
    example: "john_doe",
    description: "Unique pseudonym for the user",
  })
  pseudonyme: string;

  @ApiProperty({ example: "John Doe", description: "Full name of the user" })
  name: string;

  @ApiProperty({
    example: "123 Main St, City, Country",
    description: "Address of the user",
  })
  address?: string;

  @ApiProperty({
    example: "This is a comment",
    description: "Optional comment about the user",
  })
  comment?: string;

  @ApiProperty({
    example: "non-admin",
    description: "User type (admin or non-admin)",
  })
  userType: string;
}
