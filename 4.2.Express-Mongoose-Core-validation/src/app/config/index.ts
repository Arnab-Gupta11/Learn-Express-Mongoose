import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
};
