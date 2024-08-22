import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(userData: any): Promise<{
        message: string;
    }>;
    login(userData: any): Promise<any>;
}
