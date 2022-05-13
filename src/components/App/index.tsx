
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


const App = () => {
  const [people, setPeople] = useState<Person[]>(peopleDefault);
  const [currentPersonIndex, setCurrentPersonIndex] = useState<number>(undefined)
  const [date, setDate] = useState<Date>();
  const [bookinHolidays, setBookingHolidays] = useState(false)
  return <div className="app">
    <div className="people-list-container">
      {!date && currentPersonIndex === undefined &&
        <PeopleList
          people={people}
          setPeople={setPeople}
          setCurrentPersonIndex={setCurrentPersonIndex}
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
      <Calendar people={people} date={date} setDate={setDate} />
    </div>
    <Dialog onClose={() => setBookingHolidays(e => !e)} open={bookinHolidays}>
      <BookHolidays
        setBookingHolidays={setBookingHolidays}
        currentPersonIndex={currentPersonIndex}
        people={people}
        setPeople={setPeople}
      />
    </Dialog>
  </div>
};

export default App;
