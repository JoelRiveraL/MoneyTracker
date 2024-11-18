import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(userData: any): Promise<{
        message: string;
        user: import("../users/entities/usuario.entity").Usuario;
    }>;
    login(userData: any): Promise<{
        access_token: string;
        user: import("../users/entities/usuario.entity").Usuario;
    }>;
    profile(req: any): any;
    validateToken(authHeader: string): Promise<any>;
}
