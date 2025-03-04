import dotenv from 'dotenv';
dotenv.config();

export const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    const allowedOrigins = [
      process.env.DEVELOPMENT_ORIGIN,
      process.env.PRODUCTION_ORIGIN,
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
