import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse
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
import { IsSameUserOrAdminGuard } from "../guards/same.user.or.admin.guard";
import { AdminGuard } from '../guards/admin.guard'
import { UserTypes } from "../decorators/permissions.decorator";
import { CreateUserDto } from './dto/request/user.create.dto';
import { UpdateUserDto } from './dto/request/user.update.dto';
import { UserResponseDto } from './dto/response/user.dto';
import { UserMapper } from './mappers/users'
import { User, UserDocument } from "./user.schema";

@ApiTags("users")
@ApiBearerAuth()
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) { }

  @ApiOperation({ summary: "Create a new user" })
  @ApiOkResponse({ status: 201, description: "The user has been created.", type: UserResponseDto })
  @ApiResponse({ status: 403, description: "Forbidden for non-admin users" })
  @UseGuards(AuthGuard("jwt"), AdminGuard)
  @UserTypes("admin")
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user: User = await this.usersService.create(createUserDto);
    return UserMapper.toUserDto(user);
  }

  @ApiOperation({ summary: "Get a list of all users" })
  @ApiOkResponse({ status: 200, description: "List of users retrieved.", type: [UserResponseDto] })
  @ApiResponse({ status: 403, description: "Forbidden for non-admin users" })
  @UseGuards(AuthGuard("jwt"), AdminGuard)
  @UserTypes("admin")
  @Get()
  async getAllUsers(): Promise<UserResponseDto[]> {
    const users: User[] = await this.usersService.findAll();
    return users.map(user => UserMapper.toUserDto(user));
  }

  @ApiOperation({ summary: "Delete a user" })
  @ApiResponse({ status: 200, description: "User deleted." })
  @ApiResponse({ status: 403, description: "Forbidden for non-admin users" })
  @UseGuards(AuthGuard("jwt"), AdminGuard)
  @UserTypes("admin")
  @Delete(":pseudonyme")
  async deleteUser(@Param("pseudonyme") pseudonyme: string): Promise<UserResponseDto> {
    const user: UserDocument = await this.usersService.delete(pseudonyme);
    return UserMapper.toUserDto(user);
  }

  @ApiOperation({ summary: "Get user" })
  @ApiOkResponse({ status: 200, description: "User profile retrieved.", type: UserResponseDto })
  @ApiResponse({ status: 403, description: "Forbidden to retrieve profiles of other users for non-admin users" })
  @UseGuards(AuthGuard("jwt"), IsSameUserOrAdminGuard)
  @UserTypes("admin")
  @Get(":pseudonyme")
  async getMe(@Param("pseudonyme") pseudonyme: string): Promise<UserResponseDto> {
    const userByPseudonyme: User = await this.usersService.findOneByPseudonyme(pseudonyme);
    return UserMapper.toUserDto(userByPseudonyme);
  }

  @ApiOperation({ summary: "Update a user profile" })
  @ApiOkResponse({ status: 200, description: "User profile updated.", type: UserResponseDto })
  @ApiResponse({ status: 403, description: "Forbidden to retrieve profiles of other users for non-admin users" })
  @UseGuards(AuthGuard("jwt"), IsSameUserOrAdminGuard)
  @UserTypes("admin")
  @Patch(":pseudonyme")
  async updateUser(@Param("pseudonyme") pseudonyme: string, @Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const updateUser: User = await this.usersService.update(pseudonyme, updateUserDto);
    return UserMapper.toUserDto(updateUser);
  }
}
