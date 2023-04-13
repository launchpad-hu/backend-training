// cd 4_stores && npx vite

//

import { observer } from "mobx-react-lite";
import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";

import { Volunteer } from "../shared/entities/Volunteer";
import "./debug";
import { volunteersStore } from "./volunteerStore";

const ParticipationsOfVolunteer = observer(
  ({ volunteer }: { volunteer: Volunteer }) => {
    const participations =
      volunteersStore.volunteerInfo(volunteer).participations;
    return (
      <ul>
        {participations.map((participation) => (
          <li>{participation.date.toLocaleDateString()}</li>
        ))}
      </ul>
    );
  }
);

const VolunteerList = observer(() => {
  const handleDelete = (volunteer: Volunteer) => {
    if (!confirm("Really delete?")) return;
    volunteersStore.deleteVolunteer(volunteer);
  };
  return (
    <ul>
      {volunteersStore.volunteers.map((volunteer) => (
        <li>
          {volunteer.name}-{volunteer.phoneNumber}
          <button onClick={() => handleDelete(volunteer)}>×</button>
          <Suspense fallback={"..."}>
            <ParticipationsOfVolunteer {...{ volunteer }} />
          </Suspense>
        </li>
      ))}
    </ul>
  );
});

const App = observer(() => {
  return (
    <div>
      <Suspense fallback="Loading volunteers...">
        <VolunteerList />
      </Suspense>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          volunteersStore.saveNewVolunteer();
        }}
      >
        New Volunteer:
        <input
          placeholder="Name"
          value={volunteersStore.newVolunteerName}
          onChange={(e) =>
            (volunteersStore.newVolunteerName = e.currentTarget.value)
          }
        />
        <input
          placeholder="Phone"
          value={volunteersStore.newVolunteerPhone}
          onChange={(e) =>
            (volunteersStore.newVolunteerPhone = e.currentTarget.value)
          }
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
