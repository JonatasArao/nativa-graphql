import express from 'express';
import morgan from 'morgan';
import apiRoutes from '@/api/routes';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/', apiRoutes);

export default app;