import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '../services/tickets-service.ts';

export async function getTicketType(req: Request, res: Response) {
  try {
    const tickets = await ticketsService.getTicketType();
    return res.status(httpStatus.OK).send(tickets);
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.NO_CONTENT);
  }
}
