import { Entity, Fields } from "remult";

@Entity('volunteer', {
    allowApiCrud: true
})
export class Volunteer {
   @Fields.string()
   name!: string

   @Fields.string()
   phoneNumber!: string
}
    