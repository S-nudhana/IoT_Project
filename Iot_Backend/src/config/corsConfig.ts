import dotenv from 'dotenv';
dotenv.config();

export const corsOptions = {
  origin: process.env.PRODUCTION_ORIGIN,
  credentials: true,
};
