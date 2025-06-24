import { Router } from 'express';
import { getPhrase } from '@/api/controllers/phrase.controller';

const router = Router();

router.get('/dica-do-dia', getPhrase);

export default router;