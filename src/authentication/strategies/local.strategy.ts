// Why local strategy

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../authentication.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "pseudonyme" });
  }

  // TODO: add types here
  async validate(pseudonyme: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(pseudonyme, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
