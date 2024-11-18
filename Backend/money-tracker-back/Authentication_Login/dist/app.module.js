"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("./auth/auth.service");
const users_module_1 = require("./users/users.module");
const auth_controller_1 = require("./auth/auth.controller");
const jwt_1 = require("@nestjs/jwt");
const jwt_constant_1 = require("./auth/constants/jwt.constant");
const usuario_entity_1 = require("./users/entities/usuario.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: +(process.env.DB_PORT || 3306),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD || '',
                database: process.env.DB_NAME,
                entities: [usuario_entity_1.Usuario],
                synchronize: true,
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: jwt_constant_1.jwtConstants.secret,
                signOptions: { expiresIn: '3m' },
            }),
            users_module_1.UsersModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map