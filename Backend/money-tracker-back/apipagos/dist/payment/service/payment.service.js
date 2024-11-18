"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("firebase/database");
const firebaseConfig_1 = require("../../firebaseConfig");
let PaymentService = class PaymentService {
    async createPayment(data) {
        const dataRef = (0, database_1.ref)(firebaseConfig_1.firebaseDataBase, 'Payment');
        const newElementRef = (0, database_1.push)(dataRef, { dataRef: data });
        await (0, database_1.set)(newElementRef, { ...data, userId: data.userId });
    }
    async getPayments(userId) {
        const dataRef = (0, database_1.ref)(firebaseConfig_1.firebaseDataBase, 'Payment');
        const snapshot = await (0, database_1.get)(dataRef);
        const payments = snapshot.val();
        console.log(payments);
        const paymentsArray = Object.keys(payments).reduce((acc, id) => {
            const payment = payments[id];
            if (payment.userId === userId) {
                acc.push({ id, ...payment });
            }
            return acc;
        }, []);
        console.log(paymentsArray);
        return paymentsArray;
    }
    async getPaymentById(userId, paymentId) {
        const dataRef = (0, database_1.ref)(firebaseConfig_1.firebaseDataBase, `Payment/${paymentId}`);
        const snapshot = await (0, database_1.get)(dataRef);
        const payment = snapshot.val();
        if (payment && payment.userId === userId) {
            return payment;
        }
        else {
            throw new Error('Payment not found.');
        }
    }
    async updatePayment(data, paymentId) {
        const paymentRef = (0, database_1.ref)(firebaseConfig_1.firebaseDataBase, `Payment/${paymentId}`);
        const snapshot = await (0, database_1.get)(paymentRef);
        const payment = snapshot.val();
        if (payment && payment.userId === data.userId) {
            await (0, database_1.set)(paymentRef, { ...payment, ...data });
        }
        else {
            throw new Error('Payment not found.');
        }
    }
    async deletePayment(userId, paymentId) {
        const paymentRef = (0, database_1.ref)(firebaseConfig_1.firebaseDataBase, `Payment/${paymentId}`);
        const snapshot = await (0, database_1.get)(paymentRef);
        const payment = snapshot.val();
        if (payment && payment.userId === userId) {
            await (0, database_1.remove)(paymentRef);
        }
        else {
            throw new Error('Payment not found.');
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)()
], PaymentService);
//# sourceMappingURL=payment.service.js.map