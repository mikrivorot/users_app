import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './authentication.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login.request'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() user: LoginUserDto) {
        return this.authService.login(user);
    }
}
