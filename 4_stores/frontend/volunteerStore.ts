import { makeAutoObservable } from "mobx";
import { remult } from "remult";
import { Participation } from "../shared/entities/Participation";
import { Volunteer } from "../shared/entities/Volunteer";
import { ParticipationsStore } from "./participationsStore";

class VolunteerStore {
  volunteers: Volunteer[] = [];
  participationsStores = new Map<Volunteer, ParticipationsStore>();

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

  participationsOf(volunteer: Volunteer): Participation[] {
    let store = this.participationsStores.get(volunteer);
    if (store === undefined) {
      store = new ParticipationsStore(volunteer);
      this.participationsStores.set(volunteer, store);
    }
    return store.participations;
  }
}
export const volunteerStore = new VolunteerStore(); // singleton
Object.assign(globalThis, { volunteerStore });
// globalThis.volunteerStore = volunteerStore
