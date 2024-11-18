import { Injectable } from '@nestjs/common';
import { DataSnapshot, push, ref, set, get, remove } from 'firebase/database';
import { firebaseDataBase } from 'src/firebaseConfig';

@Injectable()
export class PaymentService {
  // Crear un nuevo pago
  async createPayment(data: any): Promise<void> {
    const dataRef = ref(firebaseDataBase, 'Payment');
    const newElementRef = push(dataRef, { dataRef: data });
    await set(newElementRef, { ...data, userId: data.userId }); 
  }

  // Obtener los pagos de un usuario
  async getPayments(userId: string): Promise<any> {
    const dataRef = ref(firebaseDataBase, 'Payment');
    const snapshot: DataSnapshot = await get(dataRef);
    const payments = snapshot.val();
    console.log(payments); // Muestra el objeto completo de pagos

    // Filtrar pagos por userId y mantener el ID de Firebase
    const paymentsArray = Object.keys(payments).reduce((acc: any[], id) => {
      const payment = payments[id];
      if (payment.userId === userId) {
        acc.push({ id, ...payment }); // Agregar el ID junto con los datos del pago
      }
      return acc;
    }, []);

    console.log(paymentsArray); // Muestra el array con los IDs y los pagos
    return paymentsArray;
  }

  // Obtener un solo pago por ID
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

  // Actualizar un pago
  async updatePayment(data: any, paymentId: string): Promise<void> {
    const paymentRef = ref(firebaseDataBase, `Payment/${paymentId}`);
    const snapshot: DataSnapshot = await get(paymentRef);
    const payment = snapshot.val();

    // Verifica si el pago existe y si pertenece al usuario
    if (payment && payment.userId === data.userId) {
      // Mantén los datos anteriores y actualiza solo lo necesario
      await set(paymentRef, { ...payment, ...data });
    } else {
      throw new Error('Payment not found.');
    }
  }

  // Eliminar un pago
  async deletePayment(userId: string, paymentId: string): Promise<void> {
    const paymentRef = ref(firebaseDataBase, `Payment/${paymentId}`);
    const snapshot: DataSnapshot = await get(paymentRef);
    const payment = snapshot.val();
    
    // Verifica si el pago existe y si pertenece al usuario
    if (payment && payment.userId === userId) {
      await remove(paymentRef);  // Elimina el pago en lugar de setearlo como null
    } else {
      throw new Error('Payment not found.');
    }
  }
}
