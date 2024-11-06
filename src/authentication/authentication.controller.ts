import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './authentication.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login.request'
import { LoggerService } from '../logger/logger.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly logger: LoggerService
    ) { }

    @Post('login')
    async login(@Body() user: LoginUserDto) {
        const logData = {
            message: 'Test log message',
            timestamp: new Date().toISOString(),
            level: 'info',
        };
        await this.logger.indexLog('test_1', logData);
        return this.authService.login(user);
    }
}
