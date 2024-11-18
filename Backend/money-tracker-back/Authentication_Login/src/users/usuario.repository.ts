import { EntityRepository, Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity'; // Asegúrate de que exista esta entidad

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> {}
