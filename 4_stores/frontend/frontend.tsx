// cd 4_stores && npx vite

//

import { observer } from "mobx-react-lite";
import { render } from "react-dom";
import { Volunteer } from "../shared/entities/Volunteer";
import "./volunteerStore";
import { volunteerStore } from "./volunteerStore";

const VolunteerList = observer(() => {
  const handleDelete = (volunteer: Volunteer) => {
    if (!confirm("Really delete?")) return;
    volunteerStore.deleteVolunteer(volunteer);
  };
  return (
    <ul>
      {volunteerStore.volunteers.map((volunteer) => (
        <li>
          {volunteer.name}-{volunteer.phoneNumber}
          <button onClick={() => handleDelete(volunteer)}>×</button>
        </li>
      ))}
    </ul>
  );
});

const App = observer(() => {
  return (
    <div>
      <VolunteerList />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          volunteerStore.saveNewVolunteer();
        }}
      >
        New Volunteer:
        <input
          placeholder="Name"
          value={volunteerStore.newVolunteerName}
          onChange={(e) =>
            (volunteerStore.newVolunteerName = e.currentTarget.value)
          }
        />
        <input
          placeholder="Phone"
          value={volunteerStore.newVolunteerPhone}
          onChange={(e) =>
            (volunteerStore.newVolunteerPhone = e.currentTarget.value)
          }
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
});
render(<App />, document.getElementById("root"));
