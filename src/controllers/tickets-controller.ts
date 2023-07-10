import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '../services/tickets-service.ts';
import { AuthenticatedRequest } from '../middlewares/authentication-middleware.js';

export async function getTicketType(req: Request, res: Response) {
  try {
    const tickets = await ticketsService.getTicketType();
    return res.status(httpStatus.OK).send(tickets);
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.NO_CONTENT);
  }
}

export async function findTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const find = await ticketsService.findTicket(userId);
    if (!find) res.sendStatus(httpStatus.NOT_FOUND);
    res.status(httpStatus.OK).send(find);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(httpStatus.NOT_FOUND).send(err.message);
    }
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body as { ticketTypeId: number };
  const { userId } = req;
  try {
    if (!userId) res.sendStatus(httpStatus.NOT_FOUND);
    if (!ticketTypeId) res.sendStatus(httpStatus.BAD_REQUEST);
    await ticketsService.createTicket(ticketTypeId, userId);
    const findTicketCreated = await ticketsService.findTicket(userId);
    res.status(httpStatus.CREATED).send(findTicketCreated);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
}
