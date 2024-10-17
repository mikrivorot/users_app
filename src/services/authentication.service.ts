// src/auth/auth.service.ts
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(pseudonyme: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByPseudonyme(pseudonyme);
    if (user && (await compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      pseudonyme: user.pseudonyme,
      sub: user._id,
      userType: user.userType,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
