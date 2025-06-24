import express from 'express';
import apiRoutes from '@/api/routes';

const app = express();

app.use(express.json());

app.use('/', apiRoutes);

export default app;