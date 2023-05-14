import express from 'express';
import { authRoutes, healthcheck } from './routes';
import { errorHandler } from './middlewares';

const app = express();

app.use(express.json());

app.get('/', healthcheck);
app.use('/auth', authRoutes);
app.use(errorHandler);

export default app;
