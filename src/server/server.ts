// cd 4_stores && node --watch --loader=ts-node/esm 4.2_server.ts
// Készíts el egy Remult + express szervert!

import express from "express";
import { remultExpress } from "remult/remult-express";
import { Participation } from "../shared/entities/Participation";
import { Volunteer } from "../shared/entities/Volunteer";

const app = express();
app.use(
  remultExpress({
    entities: [Volunteer, Participation],
  })
);

const port = 3002;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
