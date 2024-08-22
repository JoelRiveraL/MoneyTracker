export declare class UsersService {
    createUser(data: any): Promise<void>;
    getUsers(): Promise<any>;
    getUserValidation(userEmail: string, userPass: string): Promise<any>;
    login(userData: any): Promise<any>;
}
