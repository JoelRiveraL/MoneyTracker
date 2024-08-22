import { UsersService } from '../service/users.service';
import { AuthService } from '../../auth/auth.service';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    createUser(userData: any): Promise<{
        message: string;
    }>;
    getUsers(): Promise<any>;
    login(userData: any): Promise<any>;
}
