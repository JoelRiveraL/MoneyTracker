import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from '../service/payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post('createData')
    async createData(@Body() data: any): Promise<void> {
        await this.paymentService.createPayment(data);
    }

    @Get('getData')
    async getData(): Promise<any> {
        return await this.paymentService.getPayments();
    }
}
