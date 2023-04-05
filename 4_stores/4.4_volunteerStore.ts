import { makeAutoObservable } from "mobx";

class VolunteerStore {
  constructor() {
    makeAutoObservable(this);
  }
}
