import { makeAutoObservable } from "mobx";
import { Volunteer } from "./4.3_Volunteer";
import { remult } from "remult";

class VolunteerStore {
  
  volunteers: Volunteer[] = []

  newVolunteerName = ''
  newVolunteerPhone = ''

  constructor() {
    makeAutoObservable(this);
    remult.repo(Volunteer).liveQuery().subscribe((volunteers) => {
      this.volunteers = volunteers.items
    })
  }

  saveNewVolunteer() {
    remult.repo(Volunteer).insert({
      name: this.newVolunteerName,
      phoneNumber: this.newVolunteerPhone
    })
  }
}
export const volunteerStore = new VolunteerStore() // singleton
Object.assign(globalThis, { volunteerStore })
// globalThis.volunteerStore = volunteerStore