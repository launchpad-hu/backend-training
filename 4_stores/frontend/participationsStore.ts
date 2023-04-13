import { makeAutoObservable } from "mobx";
import { Participation } from "../shared/entities/Participation";
import { Volunteer } from "../shared/entities/Volunteer";
import { remult } from "remult";

export class ParticipationsStore {
  participations: Participation[] = [];

  constructor(volunteer: Volunteer) {
    makeAutoObservable(this);
    remult
      .repo(Participation)
      .liveQuery({ where: { volunteer } })
      .subscribe((participations) => {
        this.participations = participations.items;
      });
  }
}
