export declare class UsersService {
    createUser(data: any): Promise<void>;
    getUserValidation(userEmail: string): Promise<any>;
    login(userData: any): Promise<any>;
}
