import { Injectable } from '@nestjs/common';
import { DataSnapshot, push, ref, set, get } from 'firebase/database';
import { firebaseDataBase } from 'src/firebaseConfig';

@Injectable()
export class PaymentService {
  async createPayment(data: any): Promise<void> {
    const dataRef = ref(firebaseDataBase, 'Payment');
    const newElementRef = push(dataRef, { dataRef: data });
    await set(newElementRef, { ...data, userId: data.userId }); 
  }
  //Aqui debe ser que solo sean los pagos de ese usuario que tiene el token y por ende tiene el userId
  async getPayments(userId: string): Promise<any> {
    const dataRef = ref(firebaseDataBase, 'Payment');
    const snapshot: DataSnapshot = await get(dataRef);
    const payments = snapshot.val();
    const userPayments = Object.values(payments).filter(
      (payment: any) => payment.userId === userId,
    );
    return userPayments;
  }

  //Aqui se debe hacer un get de un solo pago por el id del pago y el userId

  async getPaymentById(userId: string, paymentId: string): Promise<any> {
    const dataRef = ref(firebaseDataBase, `Payment/${paymentId}`);
    const snapshot: DataSnapshot = await get(dataRef);
    const payment = snapshot.val();

    // Verifica que el pago pertenece al usuario autenticado
    if (payment && payment.userId === userId) {
      return payment;
    } else {
      throw new Error('Payment not found.');
    }
  }


  //Aqui se debe hacer un update de un solo pago por el id del pago y el userId
  async updatePayment(data: any,paymentId: string): Promise<void> {
    const paymentRef = ref(firebaseDataBase, `Payment/${paymentId}`);
    const snapshot: DataSnapshot = await get(paymentRef);
    const payment = snapshot.val();

    // Verifica si el pago existe y si pertenece al usuario
    if (payment && payment.userId === data.userId) {
      await set(paymentRef, { ...payment, ...data });
    } else {
      throw new Error('Payment not found.');
    }
  }

  //Aqui se debe hacer un delete de un solo pago por el id del pago y el userId
    async deletePayment(data: any,paymentId): Promise<void> {
        const paymentRef = ref(firebaseDataBase, `Payment/${paymentId}`);
        const snapshot: DataSnapshot = await get(paymentRef);
        const payment = snapshot.val();
    
        // Verifica si el pago existe y si pertenece al usuario
        if (payment && payment.userId === data.userId) {
        await set(paymentRef, null);
        } else {
        throw new Error('Payment not found.');
        }
    }

}
