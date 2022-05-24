import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routs.js";
import { connect } from "./controllers/db.connect.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use('/api/auth', authRouter);
app.use('/api/', productRouter);

const startServer = async (port) => {
  await connect()
    .then(() => app.listen(port,
      () => console.log(`Successfully connect DB, listening on port ${port}`)
    )
    ).catch(error => {
      console.log(`Error when connecting to db: ${error}`)
    });
}

const PORT = process.env.PORT || 5000;
startServer(PORT);