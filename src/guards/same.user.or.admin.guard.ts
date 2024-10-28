import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PayloadToSign } from 'src/authentication/types';

@Injectable()
export class IsSameUserOrAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ params: { pseudonyme: string }, user: PayloadToSign }>();

    if (roles.includes(request?.user?.userType)) {
      return true;
    } else if (
      request.user?.pseudonyme &&
      request.params?.pseudonyme &&
      request.user?.pseudonyme === request.params.pseudonyme
    ) {
      return true;
    } else {
      return false;
    }
  }
}
