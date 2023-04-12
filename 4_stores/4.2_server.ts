// Készíts el egy Remult + express szervert!

import express from "express";
import { remultExpress } from "remult/remult-express";
import { Volunteer } from "./4.3_Volunteer";

const app = express();
app.use(
  remultExpress({
    entities: [Volunteer],
  })
);

const port = 3002;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
