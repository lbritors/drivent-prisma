import { Payment } from '@prisma/client';
import paymentRepository from '../../repositories/payment-repository.ts';
async function getPaymentByTicketId(ticketId: number): Promise<Payment> {
    const payment = await paymentRepository.getPaymentByTicketId(ticketId);

}
