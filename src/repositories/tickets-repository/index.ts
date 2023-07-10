import { prisma } from '@/config';

async function findFirst() {
  return prisma.ticket.findFirst();
}

async function findTicketsType() {
  return prisma.ticketType.findMany();
}
const ticketsRepository = {
  findFirst,
  findTicketsType,
};
export default ticketsRepository;
