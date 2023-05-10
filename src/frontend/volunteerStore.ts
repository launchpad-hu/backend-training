import { makeAutoObservable } from "mobx";
import { remult } from "remult";
import { Volunteer } from "../shared/entities/Volunteer";
import use from "../shared/utils/use";
import { VolunteerInfoStore } from "./VolunteerInfoStore";

class VolunteersStore {
  volunteerInfoStores = new Map<Volunteer, VolunteerInfoStore>();

  newVolunteerName = "";
  newVolunteerPhone = "";

  constructor() {
    makeAutoObservable(this);
  }

  get volunteers_update$() {
    return remult.repo(Volunteer).liveQuery();
  }
  get volunteers() {
    return use(this.volunteers_update$).items;
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

  volunteerInfo(volunteer: Volunteer) {
    let store = this.volunteerInfoStores.get(volunteer);
    if (store === undefined) {
      store = new VolunteerInfoStore(volunteer);
      this.volunteerInfoStores.set(volunteer, store);
    }
    return store;
  }
}
export const volunteersStore = new VolunteersStore(); // singleton
Object.assign(globalThis, { volunteersStore });
// globalThis.volunteerStore = volunteerStore
