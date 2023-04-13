import { Entity, Field, Fields } from "remult";
import { Volunteer } from "./Volunteer";

@Entity("participation", {
  allowApiCrud: true,
})
export class Participation {
  @Fields.uuid()
  id!: string;

  @Fields.string()
  program!: string;

  @Fields.string()
  location!: string;

  @Fields.dateOnly()
  date!: Date;

  @Field(() => Volunteer)
  volunteer?: Volunteer;
}
