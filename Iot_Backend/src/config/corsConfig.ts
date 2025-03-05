import dotenv from 'dotenv';
dotenv.config();

export const corsOptions = {
  origin: [
    process.env.DEVELOPMENT_ORIGIN,
    process.env.PRODUCTION_ORIGIN,
  ].filter((origin): origin is string => origin !== undefined),
  credentials: true,
};
