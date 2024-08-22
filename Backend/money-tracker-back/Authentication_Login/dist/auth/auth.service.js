"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcryptjs = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register({ name, lastname, email, password }) {
        const user = await this.usersService.getUserValidation(email);
        if (user) {
            throw new common_1.BadRequestException('User already exists');
        }
        const newUser = await this.usersService.createUser({
            name,
            lastname,
            email,
            password: bcryptjs.hashSync(password, 10)
        });
        return { message: 'User created successfully', user: newUser };
    }
    async login({ email, password }) {
        const user = await this.usersService.getUserValidation(email);
        console.log(user.id);
        if (!user) {
            throw new common_1.UnauthorizedException('Email is incorrect');
        }
        const passwordValid = await bcryptjs.compare(password, user.password);
        if (!passwordValid) {
            throw new common_1.UnauthorizedException('Password is incorrect');
        }
        const payload = {
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            sub: user.id
        };
        const token = await this.jwtService.signAsync(payload);
        return {
            access_token: token,
            user: user
        };
    }
    async validateToken(token) {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
            return payload;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map