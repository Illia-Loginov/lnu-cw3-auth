import express from 'express';
import { authRoutes, healthcheck } from './routes';
import { errorHandler } from './middlewares';
import { serverConfig } from './config';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: serverConfig.frontendUrl
  })
);

app.get('/', healthcheck);
app.use('/auth', authRoutes);
app.use(errorHandler);

export default app;
