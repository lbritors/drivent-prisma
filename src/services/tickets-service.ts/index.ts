import { notFoundError } from '../../errors';
import ticketsRepository from '../../repositories/tickets-repository';

async function getTicket() {
  const ticket = await ticketsRepository.findFirst();
  console.log(ticket);
  if (!ticket) throw notFoundError();
}

async function getTicketType() {
  const ticketType = await ticketsRepository.findTicketsType();
  return ticketType;
}

const ticketsService = {
  getTicket,
  getTicketType,
};

export default ticketsService;
