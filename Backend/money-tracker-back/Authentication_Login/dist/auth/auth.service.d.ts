import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register({ name, lastname, email, password }: any): Promise<{
        message: string;
        user: void;
    }>;
    login({ email, password }: any): Promise<{
        access_token: string;
        user: any;
    }>;
    validateToken(token: string): Promise<any>;
}
