import { makeAutoObservable } from "mobx";
import { remult } from "remult";
import { Volunteer } from "./4.3_Volunteer";

class VolunteerStore {
  volunteers: Volunteer[] = [];

  newVolunteerName = "";
  newVolunteerPhone = "";

  constructor() {
    makeAutoObservable(this);
    remult
      .repo(Volunteer)
      .liveQuery()
      .subscribe((volunteers) => {
        this.volunteers = volunteers.items;
      });
  }

  saveNewVolunteer() {
    remult.repo(Volunteer).insert({
      name: this.newVolunteerName,
      phoneNumber: this.newVolunteerPhone,
    });
    this.newVolunteerName = "";
    this.newVolunteerPhone = "";
  }

  deleteVolunteer(volunteer: Volunteer) {
    remult.repo(Volunteer).delete(volunteer.id);
  }
}
export const volunteerStore = new VolunteerStore(); // singleton
Object.assign(globalThis, { volunteerStore });
// globalThis.volunteerStore = volunteerStore
