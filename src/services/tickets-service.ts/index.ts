import { Ticket } from '@prisma/client';
import { notFoundError } from '../../errors';
import enrollmentRepository from '../../repositories/enrollment-repository';
import ticketsRepository from '../../repositories/tickets-repository';
import { badRequestError } from '../../errors/bad-request-error';

async function findTicket(userId: number): Promise<Ticket> {
  const enrollment = await enrollmentRepository.getUserData(userId);
  if (!enrollment) throw notFoundError();

  const ticket: Ticket = await ticketsRepository.findTicket(userId);
  console.log(ticket);
  if (!ticket) throw notFoundError();
  return ticket;
}

async function getTicketType() {
  const ticketType = await ticketsRepository.findTicketsType();
  if (ticketType.length === 0) return [];
  return ticketType;
}

async function createTicket(ticketTypeId: number, userId: number) {
  if (!ticketTypeId) throw badRequestError('Invalid Data');
  const enrollment = await enrollmentRepository.getUserData(userId);
  if (!enrollment) throw notFoundError();
  const ticket = await ticketsRepository.createTicket(ticketTypeId, enrollment.id);
  return ticket;
}

const ticketsService = {
  findTicket,
  getTicketType,
  createTicket,
};

export default ticketsService;
