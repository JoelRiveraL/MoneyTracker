import { Injectable } from '@nestjs/common';
import { DataSnapshot, push, ref, set, get, update, remove } from 'firebase/database';
import { firebaseDataBase } from 'src/firebaseConfig';

@Injectable()
export class UsersService {
    async createUser(data: any): Promise<void> {
        const dataRef = ref(firebaseDataBase, 'Users');
        const newElementRef = push(dataRef, {dataRef: data});
        await set(newElementRef, data);
    }

    async getUsers(): Promise<any> {
        const dataRef = ref(firebaseDataBase, 'Users');
        const snapshot: DataSnapshot = await get(dataRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    }

    async getUserValidation(userEmail: string): Promise<any> { //Not users with email repeated
        const dataRef = ref(firebaseDataBase, 'Users');
        const snapshot: DataSnapshot = await get(dataRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            var user = null;
            for (const userId in data) {
                if (data[userId].email === userEmail) {
                    user = {id:userId, ...data[userId]};
                }
            }
            return user;
        } else {
            return null;
        }
    }

    async updateUser(id: string, userData: any): Promise<void> {
        const userRef = ref(firebaseDataBase, `Users/${id}`);
        const snapshot: DataSnapshot = await get(userRef);
        if (!snapshot.exists()) {
            throw new Error('Usuario no encontrado');
        }
        await update(userRef, userData);
    }

    

    async deleteUser(id: string): Promise<void> {
        const userRef = ref(firebaseDataBase, `Users/${id}`);
        const snapshot: DataSnapshot = await get(userRef);
        if (!snapshot.exists()) {
            throw new Error('Usuario no encontrado');
        }
        await remove(userRef);
    }
}
