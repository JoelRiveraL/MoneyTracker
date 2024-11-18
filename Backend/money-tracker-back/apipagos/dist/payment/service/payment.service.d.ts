export declare class PaymentService {
    createPayment(data: any): Promise<void>;
    getPayments(userId: string): Promise<any>;
    getPaymentById(userId: string, paymentId: string): Promise<any>;
    updatePayment(data: any, paymentId: string): Promise<void>;
    deletePayment(userId: string, paymentId: string): Promise<void>;
}
