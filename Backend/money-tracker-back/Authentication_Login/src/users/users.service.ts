import { Injectable } from '@nestjs/common';
import { DataSnapshot, push, ref, set, get } from 'firebase/database';
import { firebaseDataBase } from 'src/firebaseConfig';

@Injectable()
export class UsersService {
    async createUser(data: any): Promise<void> {
        const dataRef = ref(firebaseDataBase, 'Users');
        const newElementRef = push(dataRef, {dataRef: data});
        await set(newElementRef, data);
    }

    async getUserValidation(userEmail: string): Promise<any> {
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

    async login(userData: any): Promise<any> {
        const dataRef = ref(firebaseDataBase, 'Users');
        const snapshot: DataSnapshot = await get(dataRef);
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
}
