import "reflect-metadata"
import express from "express"
import connection from "./configuration/connection"
import cors from "cors"
import path from "path"

import { router } from "./routes"
const app = express()


app.use(express.json());
app.use(cors())
app.use(express.json())
app.use(router)
const start = async (): Promise<void> => {
  try {
    connection.addModels([path.join(__dirname, '/models/*.ts')])
    if (process.env.ENVIRONMENT === 'DEV') {
      const sync = await connection.sync();
      // console.log('sync', sync)
    }

    app.listen(process.env.PORT)
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();