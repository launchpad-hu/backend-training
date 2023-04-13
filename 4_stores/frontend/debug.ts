import { remult } from "remult";
import { Participation } from "../shared/entities/Participation";
import { Volunteer } from "../shared/entities/Volunteer";

Object.assign(globalThis, {
  remult,
  Volunteer,
  Participation,
});
