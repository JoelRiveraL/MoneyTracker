import { PaymentService } from '../service/payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createData(data: any, request: any): Promise<void>;
    getData(request: any): Promise<any>;
    getDataById(id: string, request: any): Promise<any>;
    updateData(data: any, request: any, id: string): Promise<void>;
    deleteData(data: any, request: any, id: string): Promise<void>;
}
