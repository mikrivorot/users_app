import { UserResponseDto } from '../dto/response/user.dto';
import { User } from '../user.schema';

export class UserMapper {
    static toUserDto(user: User): UserResponseDto {
        const userDto = new UserResponseDto();
        userDto.pseudonyme = user?.pseudonyme;
        userDto.name = user?.name;
        userDto.address = user?.address;
        userDto.comment = user?.commentaire;
        userDto.userType = user?.userType;
        return userDto;
    }
}
