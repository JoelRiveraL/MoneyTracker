import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/service/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register({ name, lastname, email, password }: any): Promise<{
        message: string;
        user: import("../users/entities/usuario.entity").Usuario;
    }>;
    login({ email, password }: any): Promise<{
        access_token: string;
        user: import("../users/entities/usuario.entity").Usuario;
    }>;
    validateToken(token: string): Promise<any>;
}
