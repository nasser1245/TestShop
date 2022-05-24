import { Client } from "cassandra-driver";
import dotenv from "dotenv";
dotenv.config();

export const client = new Client({
  cloud: {
    secureConnectBundle: process.env.SECURE_CONNECT_URI,
  },
  credentials: {
    username: process.env.USER,
    password: process.env.PASSWORD,
  },
});

export const connect = async () => {
  await client.connect();
}