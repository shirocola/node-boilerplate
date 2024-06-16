import cors, { CorsOptions, CorsOptionsDelegate } from 'cors';

const allowedOrigins = ['http://localhost:3000'];

const corsOptionsDelegate: CorsOptionsDelegate = (req, callback) => {
  let corsOptions: CorsOptions;
  const origin = req.headers.origin || '';
  if (allowedOrigins.includes(origin)) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

export default cors(corsOptionsDelegate);
