import { RequestHandler } from 'express';
import { getDailyPhrase } from '@/api/services/phrase.service';

export const getPhrase: RequestHandler = (req, res) => {
  try {
    const dica = getDailyPhrase();

    res.status(200).json({ dica });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};