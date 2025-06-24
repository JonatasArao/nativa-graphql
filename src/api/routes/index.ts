import { Router } from 'express';
import phrasesRouter from './phrases.routes';

const router = Router();

router.use(phrasesRouter);

export default router;