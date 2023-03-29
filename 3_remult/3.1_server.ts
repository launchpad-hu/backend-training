// TODO indítsd el ezt a fájlt ts-node-dal:
// $ node --watch --loader ts-node/esm 3_remult/3.1_server.ts

// TODO nézd meg, hogy a /api/customer végpont működik-e

import express from "express";
import { remultExpress } from "remult/remult-express";

const app = express();
app.use(
  remultExpress({
    entities: [],
  })
);

const port = 3002;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
