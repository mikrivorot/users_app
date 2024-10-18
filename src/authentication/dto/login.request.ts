import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({
        description: 'The pseudonyme of the user',
    })
    @IsNotEmpty()
    @IsString()
    pseudonyme: string;

    @ApiProperty({
        description: 'The password of the user',
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}
