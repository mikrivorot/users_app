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
  Put,
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

@ApiTags("users")
@ApiBearerAuth()
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Create a new user (Admin only)" })
  @ApiResponse({ status: 201, description: "The user has been created." })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("admin")
  @Post("create")
  async createUser(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: "Get current logged-in user profile" })
  @ApiResponse({ status: 200, description: "User profile retrieved." })
  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  async getMe(@Param("id") userId: string) {
    return this.usersService.findById(userId);
  }

  @ApiOperation({ summary: "Get a list of all users (Admin only)" })
  @ApiResponse({ status: 200, description: "List of users retrieved." })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("admin")
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Update a user profile" })
  @ApiResponse({ status: 200, description: "User profile updated." })
  @UseGuards(AuthGuard("jwt"))
  @Patch(":id")
  async updateUser(@Param("id") userId: string, @Body() updateUserDto: any) {
    return this.usersService.update(userId, updateUserDto);
  }

  @ApiOperation({ summary: "Delete a user (Admin only)" })
  @ApiResponse({ status: 200, description: "User deleted." })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("admin")
  @Delete(":id")
  async deleteUser(@Param("id") userId: string) {
    return this.usersService.delete(userId);
  }
}
