import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(userData: any): Promise<{
        message: string;
        user: void;
    }>;
    login(userData: any): Promise<{
        access_token: string;
        user: any;
    }>;
    profile(req: any): any;
    validateToken(authHeader: string): Promise<any>;
}
