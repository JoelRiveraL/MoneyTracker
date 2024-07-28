import { Injectable } from '@nestjs/common';
import { DataSnapshot, push, ref, set, get } from 'firebase/database';
import { firebaseDataBase } from 'src/firebaseConfig';


@Injectable()
export class UsersService {
    async createPayment(data: any): Promise<void> {
        const dataRef = ref(firebaseDataBase, 'Users');
        const newElementRef = push(dataRef, {dataRef: data});
        await set(newElementRef, data);
    }

    async getPayments(): Promise<any> {
        const dataRef = ref(firebaseDataBase, 'Users');
        const snapshot: DataSnapshot = await get(dataRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    }

    async getUserById(userId: string): Promise<any> {
        const dataRef = ref(firebaseDataBase, 'Users');
        const snapshot: DataSnapshot = await get(dataRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            const user = data[userId];
            return user;
        } else {
            return null;
        }
    }

    async login(userData: any): Promise<any> {
        const dataRef = ref(firebaseDataBase, 'Users');
        const snapshot: DataSnapshot = await get(dataRef);
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
