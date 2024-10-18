import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { compare } from "bcryptjs";
import { User } from "../users/user.schema";
import { LoginUserDto } from './dto/login.request'
import { PayloadToSign } from './types'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(pseudonyme: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByPseudonyme(pseudonyme);
    if (user) {
      const passwordsAreEqual = await compare(password, user?.password);
      if (passwordsAreEqual) {
        return user
      }
    }
    return null;
  }

  async login(user: LoginUserDto) {
    const { pseudonyme, password } = user;
    const userFromDb = await this.validateUser(pseudonyme, password);

    if (!userFromDb) {
      throw new UnauthorizedException();
    }
    const payload: PayloadToSign = {
      pseudonyme: userFromDb.pseudonyme, userType: userFromDb.userType
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
