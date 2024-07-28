import { Injectable } from '@nestjs/common';
import { DataSnapshot, push, ref, set, get } from 'firebase/database';
import { firebaseDataBase } from 'src/firebaseConfig';

@Injectable()
export class PaymentService {
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
}
