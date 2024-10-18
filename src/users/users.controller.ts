import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Patch,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../guards/permissions.guard";
import { Roles } from "../decorators/permissions.decorator";
import { CreateUserDto } from './dto/request/user.create.dto';
import { UpdateUserDto } from './dto/request/user.update.dto';
import { UserResponseDto } from './dto/response/user.dto';

@ApiTags("users")
@ApiBearerAuth()
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) { }

  @ApiOperation({ summary: "Create a new user (Admin only)" })
  @ApiResponse({ status: 201, description: "The user has been created." })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("admin")
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: "Get current logged-in user profile" })
  @ApiResponse({ status: 200, description: "User profile retrieved." })
  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  async getMe(@Param("id") userId: string): Promise<UserResponseDto> {
    return this.usersService.findById(userId);
  }

  @ApiOperation({ summary: "Get a list of all users (Admin only)" })
  @ApiResponse({ status: 200, description: "List of users retrieved." })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("admin")
  @Get()
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Update a user profile" })
  @ApiResponse({ status: 200, description: "User profile updated." })
  @UseGuards(AuthGuard("jwt"))
  @Patch(":id")
  async updateUser(@Param("id") userId: string, @Body() updateUserDto: UpdateUserDto): Promise<void> {
    return this.usersService.update(userId, updateUserDto);
  }

  @ApiOperation({ summary: "Delete a user (Admin only)" })
  @ApiResponse({ status: 200, description: "User deleted." })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("admin")
  @Delete(":id")
  async deleteUser(@Param("id") userId: string): Promise<null> {
    return this.usersService.delete(userId);
  }
}
