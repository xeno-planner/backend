import { UserDto } from '@/user/dto/user.dto';
import { UserService } from '@/user/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    profile(id: string): Promise<{
        user: import("../assets/types/SanitizedUser").SanitizedUser;
        statistics: {
            label: string;
            value: number;
        }[];
    }>;
    updateProfile(id: string, dto: UserDto): Promise<{
        email: string;
        name: string;
    }>;
}
