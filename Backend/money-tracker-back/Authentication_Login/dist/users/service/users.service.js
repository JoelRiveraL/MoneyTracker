"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("firebase/database");
const firebaseConfig_1 = require("../../firebaseConfig");
let UsersService = class UsersService {
    async createUser(data) {
        const dataRef = (0, database_1.ref)(firebaseConfig_1.firebaseDataBase, 'Users');
        const newElementRef = (0, database_1.push)(dataRef, { dataRef: data });
        await (0, database_1.set)(newElementRef, data);
    }
    async getUsers() {
        const dataRef = (0, database_1.ref)(firebaseConfig_1.firebaseDataBase, 'Users');
        const snapshot = await (0, database_1.get)(dataRef);
        if (snapshot.exists()) {
            return snapshot.val();
        }
        else {
            return null;
        }
    }
    async getUserValidation(userEmail, userPass) {
        const dataRef = (0, database_1.ref)(firebaseConfig_1.firebaseDataBase, 'Users');
        const snapshot = await (0, database_1.get)(dataRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            var user = null;
            for (const userId in data) {
                if (data[userId].email === userEmail && data[userId].password === userPass) {
                    user = data[userId];
                }
            }
            return user;
        }
        else {
            return null;
        }
    }
    async login(userData) {
        const dataRef = (0, database_1.ref)(firebaseConfig_1.firebaseDataBase, 'Users');
        const snapshot = await (0, database_1.get)(dataRef);
        console.log('userData', userData);
        if (snapshot.exists()) {
            const data = snapshot.val();
            for (const userId in data) {
                if (data[userId].email === userData.email && data[userId].password === userData.password) {
                    return data[userId];
                }
            }
        }
        return null;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map