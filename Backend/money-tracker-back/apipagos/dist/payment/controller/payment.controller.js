"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("../service/payment.service");
const payment_guard_1 = require("../guard/payment.guard");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async createData(data, request) {
        const userId = request.user.sub;
        await this.paymentService.createPayment({ ...data, userId });
    }
    async getData(request) {
        const userId = request.user.sub;
        return await this.paymentService.getPayments(userId);
    }
    async getDataById(id, request) {
        const userId = request.user.sub;
        return await this.paymentService.getPaymentById(userId, id);
    }
    async updateData(data, request, id) {
        const userId = request.user.sub;
        await this.paymentService.updatePayment({ ...data, userId }, id);
    }
    async deleteData(data, request, id) {
        const userId = request.user.sub;
        await this.paymentService.deletePayment({ ...data, userId }, id);
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)('createData'),
    (0, common_1.UseGuards)(payment_guard_1.PaymentGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createData", null);
__decorate([
    (0, common_1.Get)('getData'),
    (0, common_1.UseGuards)(payment_guard_1.PaymentGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getData", null);
__decorate([
    (0, common_1.Get)('getDataById/:id'),
    (0, common_1.UseGuards)(payment_guard_1.PaymentGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getDataById", null);
__decorate([
    (0, common_1.Put)('updateData/:id'),
    (0, common_1.UseGuards)(payment_guard_1.PaymentGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "updateData", null);
__decorate([
    (0, common_1.Delete)('deleteData/:id'),
    (0, common_1.UseGuards)(payment_guard_1.PaymentGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "deleteData", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map