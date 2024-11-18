import { Body, Controller, Get, Post, UseGuards,Request, Param, Put, Delete} from '@nestjs/common';
import { PaymentService } from '../service/payment.service';
import { PaymentGuard } from '../guard/payment.guard';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post('createData')
    @UseGuards(PaymentGuard)
    async createData(@Body() data: any,@Request() request:any): Promise<void> {
        const userId= request.user.sub;  
        await this.paymentService.createPayment({...data,userId});
    }

    @Get('getData')
    @UseGuards(PaymentGuard)
    async getData(@Request() request:any): Promise<any> {
        const userId= request.user.sub;  
        return await this.paymentService.getPayments(userId);
    }

    @Get('getDataById/:id')
    @UseGuards(PaymentGuard)
    async getDataById(@Param('id') id: string, @Request() request: any): Promise<any> {
        const userId = request.user.sub;
        return await this.paymentService.getPaymentById(userId, id);
    }

    @Put('updateData/:id')
    @UseGuards(PaymentGuard)
    async updateData(@Body() data: any,@Request() request:any,@Param('id') id: string): Promise<void> {
        const userId= request.user.sub;  
        await this.paymentService.updatePayment({...data,userId},id);
    }

    @Delete('deleteData/:id')
    @UseGuards(PaymentGuard)
    async deleteData(@Request() request: any, @Param('id') id: string): Promise<void> {
        const userId = request.user.sub;  
        await this.paymentService.deletePayment(userId, id);
    }

}
