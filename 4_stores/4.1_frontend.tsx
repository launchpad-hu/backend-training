// cd 4_stores && npx vite

//


import { render } from "react-dom";
import './4.4_volunteerStore';
import { volunteerStore } from "./4.4_volunteerStore";
import { observer } from "mobx-react-lite";

const VolunteerList = observer(() => {
  return <ul>
    {volunteerStore.volunteers.map((volunteer) => <li>{volunteer.name}</li>)}
  </ul>
})


const App = observer(() => {
  return <div>
    <VolunteerList/>
    <form onSubmit={(e) => {
      e.preventDefault()
      volunteerStore.saveNewVolunteer()
    }}>
      New Volunteer:
      <input placeholder="Name" 
        value={volunteerStore.newVolunteerName}
        onChange={(e) => volunteerStore.newVolunteerName = e.currentTarget.value}/>
      <input placeholder="Phone"
        value={volunteerStore.newVolunteerPhone}
        onChange={(e) => volunteerStore.newVolunteerPhone = e.currentTarget.value}
      />
      <button type="submit">Save</button>
    </form>
  </div>;
})
render(<App />, document.getElementById("root"));
