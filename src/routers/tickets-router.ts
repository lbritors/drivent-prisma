import { Router } from 'express';
import { authenticateToken } from '../middlewares';
import * as ticketsControllers from '@/controllers/tickets-controller';

const ticketsRouter = Router();

// ticketsRouter.use(authenticateToken);
ticketsRouter.get('/types', ticketsControllers.getTicketType);
ticketsRouter.get('/', ticketsControllers.findTicket);
ticketsRouter.post('/', ticketsControllers.createTicket);
export { ticketsRouter };
