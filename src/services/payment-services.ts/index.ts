import { Payment } from '@prisma/client';
import paymentRepository from '../../repositories/payment-repository.ts';
import { notFoundError } from '../../errors/not-found-error.js';
import { badRequestError } from '../../errors/bad-request-error.js';
import enrollmentRepository from '../../repositories/enrollment-repository/index.js';
import { unauthorizedError } from '../../errors/unauthorized-error.js';
import { PaymentRequestBody } from '../../protocols.js';
import ticketsRepository from '../../repositories/tickets-repository/index.js';

async function getPaymentByTicketId(ticketId: number, userId: number): Promise<Payment> {
  if (!ticketId) throw badRequestError('Invalid Data');
  const payment = await paymentRepository.getPaymentByTicketId(ticketId);
  if (!payment) throw notFoundError();
  const enrollment = await enrollmentRepository.getUserData(userId);
  if (enrollment.id !== userId) throw unauthorizedError();
  console.log(payment)
  return payment;
}

async function createPayment(body: PaymentRequestBody, userId: number) {
  if (!body.cardData || !body.ticketId) throw badRequestError('Invalid Input');
  const verifyTicketId = await paymentRepository.getPaymentByTicketId(body.ticketId);
  if (!verifyTicketId) throw notFoundError();
  const value = await ticketsRepository.findTicketByTicketId(verifyTicketId.id);
  const data = {
    ticketId: body.ticketId,
    cardIssuer: body.cardData.issuer,
    value: value.
  }

  const create = await paymentRepository.createPayment();

}
