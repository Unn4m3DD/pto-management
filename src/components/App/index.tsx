
import { useState } from "react";
import "./styles.scss";
import { Person } from "../../types";
import PeopleList from "../PeopleList";
import Calendar from "../Calendar";
import { peopleDefault } from "../../db";
import PersonDetails from "../PersonDetails";
import DayDetails from "../DayDetails";
import BookHolidays from "../BookHolidays";
import { Dialog } from "@material-ui/core";
import EditPeople from "../EditPeople";


const App = () => {
  const [people, setPeople] = useState<Person[]>(peopleDefault);
  const [deletedPeople, setDeletedPeople] = useState<Person[]>([]);
  const [currentPersonIndex, setCurrentPersonIndex] = useState<number>(undefined)
  const [date, setDate] = useState<Date>();
  const [bookingHolidays, setBookingHolidays] = useState(false)
  const [showEditPeople, setShowEditPeople] = useState(false)
  return <div className="app">
    <div className="people-list-container">
      {!date && currentPersonIndex === undefined &&
        <PeopleList
          people={people}
          setPeople={setPeople}
          setCurrentPersonIndex={setCurrentPersonIndex}
          setShowEditPeople={setShowEditPeople}
        />
      }
      {!date && currentPersonIndex !== undefined &&
        <PersonDetails
          people={people}
          setPeople={setPeople}
          setCurrentPersonIndex={setCurrentPersonIndex}
          currentPersonIndex={currentPersonIndex}
          setDate={setDate}
          setBookingHolidays={setBookingHolidays}
        />
      }
      {
        date &&
        <DayDetails
          date={date}
          people={people}
          setDate={setDate}
          setCurrentPersonIndex={setCurrentPersonIndex}
        />
      }
    </div>
    <div className="calendar-container">
      <Calendar people={people} date={date} setDate={setDate} currentPersonIndex={currentPersonIndex} />
    </div>
    <Dialog onClose={() => setBookingHolidays(e => !e)} open={bookingHolidays}>
      <BookHolidays
        setBookingHolidays={setBookingHolidays}
        currentPersonIndex={currentPersonIndex}
        people={people}
        setPeople={setPeople}
      />
    </Dialog>
    <Dialog onClose={() => setShowEditPeople(e => !e)} open={showEditPeople}>
      <EditPeople
        people={people}
        setPeople={setPeople}
        deletedPeople={deletedPeople}
        setDeletedPeople={setDeletedPeople}
      />
    </Dialog>
  </div>
};

export default App;
