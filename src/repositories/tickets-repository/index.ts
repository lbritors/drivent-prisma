import { query } from 'express';
import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function findTicketsType() {
  return prisma.ticketType.findMany();
}

type TicketRes = Ticket & TicketType;
async function findTicket(userId: number): Promise<TicketRes> {
  return prisma.$queryRaw`SELECT "Ticket".id,
  "Ticket".status,
  "Ticket"."ticketTypeId",
  "Ticket"."enrollmentId"
  json_build_objetc(
    'id', "TicketType".id,
    'name', "TicketType".name,
    'price', "TicketType".price,
    'isRemote', "TicketType"."isRemote",
    'includesHotel', "TicketType"."includesHotel",
    'createdAt', to_char("TicketType"."createdAt", 'YYYY-MM-DD"T"HH24:MI:SS.MSZ'),
    'updatedAt', to_char("TicketType"."updatedAt", 'YYYY-MM-DD"T"HH24:MI:SS.MSZ')
    ) AS "TicketType",
    to_char("Ticket"."createdAt", 'YYYY-MM-DD"T"HH24:MI:SS.MSZ') AS "createdAt",
    to_char("Ticket"."updatedAt", 'YYYY-MM-DD"T"HH24:MI:SS.MSZ') AS "updatedAt"
    FROM "Enrollment", "Ticket", "TicketType"
    WHERE "Enrollment".id = "Ticket".enrollmentId AND 
    "Ticket"."ticketTypeId" = "TicketType".id AND
    "Enrollment"."userId" = ${userId}
  )`;
}

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: 'RESERVED',
    },
  });
}

const ticketsRepository = {
  findTicket,
  findTicketsType,
  createTicket,
};
export default ticketsRepository;
