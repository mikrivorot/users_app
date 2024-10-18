import { SetMetadata } from "@nestjs/common";

export const UserTypes = (...roles: string[]) => SetMetadata("roles", roles);
