import { makeAutoObservable } from "mobx";
import { remult } from "remult";
import { Participation } from "../shared/entities/Participation";
import { Volunteer } from "../shared/entities/Volunteer";
import use from "../shared/utils/use";

export class VolunteerInfoStore {
  constructor(private volunteer: Volunteer) {
    makeAutoObservable(this);
  }

  private get participations_update$() {
    return remult
      .repo(Participation)
      .liveQuery({ where: { volunteer: this.volunteer } });
  }
  get participations(): Participation[] {
    return use(this.participations_update$).items;
  }
}
