import { Payment } from '@prisma/client';
import { prisma } from '../../config';

async function getPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

type PaymentResponse = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;
async function createPayment(payment: PaymentResponse) {
  return prisma.payment.create({
    data: payment,
  });
}

const paymentRepository = {
  getPaymentByTicketId,
  createPayment,
};

export default paymentRepository;
