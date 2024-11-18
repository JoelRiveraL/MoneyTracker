import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
export declare class UsersService {
    private readonly usuarioRepository;
    constructor(usuarioRepository: Repository<Usuario>);
    createUser(data: Partial<Usuario>): Promise<Usuario>;
    getUsers(): Promise<Usuario[]>;
    getUserValidation(email: string): Promise<Usuario | null>;
    login(userData: {
        email: string;
        password: string;
    }): Promise<Usuario | null>;
}
