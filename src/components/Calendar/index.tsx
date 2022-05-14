
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { Badge, Chip } from "@material-ui/core";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { memo, useState } from "react";
import { Person, ReactSetter } from "../../types";
import { getDay, shouldDisableDate } from "../../utils";
import './styles.scss';

interface Props {
  people: Person[]
  date?: Date
  setDate: ReactSetter<Date>
  currentPersonIndex: number | undefined
}

const CalendarItem: React.FC<
  { month: number, people: Person[], date: Date, currentPersonIndex: number, setDate: ReactSetter<Date> }
> = memo((
  { month, people, date, currentPersonIndex, setDate }
) => {
  return <LocalizationProvider dateAdapter={AdapterDateFns}>
    <CalendarPicker
      allowSameDateSelection
      renderDay={(
        currentDate,
        selectedDates,
        pickersDayProps
      ) => {
        const day = getDay(currentDate)
        let count = 0
        const outPeople = new Set<Person>()
        for (let item of people) {
          if (item.selected && item.holidays.has(day)) {
            count++
            outPeople.add(item)
          }
        }

        const style =
          (currentDate === undefined && currentPersonIndex !== undefined && people[currentPersonIndex].holidays.has(day)) ?
            { style: { color: "white", backgroundColor: "#1565c0" } } :
            (currentDate !== undefined && shouldDisableDate(currentDate)) ?
              { style: { backgroundColor: "#222", color: "white" } } :
              (date !== undefined && day === getDay(date)) ?
                { style: { backgroundColor: "red", color: "white" } } :
                { style: { color: "black", backgroundColor: "white" } }
        return <Badge
          key={pickersDayProps.key}
          overlap="circular"
          color="secondary"
          badgeContent={count !== 0 ? count : undefined}
        >
          <div style={{ position: "relative" }}>
            <PickersDay {...style} {...pickersDayProps} />
            <div className="chip-container">
              {outPeople.size < 3 ?
                [...outPeople.values()].map((e, i) => {
                  return <Chip
                    key={i}
                    className="chip"
                    style={{
                      backgroundColor: e.color
                    }}
                    label={e.name.split(" ").map(e => e[0].toUpperCase())}
                  />
                }) :
                <Chip className="chip" label={"..."} />
              }
            </div>
          </div>
        </Badge>

      }}
      date={new Date(`${new Date().getFullYear()}-${month}-${new Date().getDate()}`)} onChange={(newDate) => setDate(newDate)}
    />
  </LocalizationProvider>
}, (prev, next) => {
  if (
    prev.date?.getMonth() + 1 === prev.month ||
    prev.date?.getMonth() + 1 === next.month ||
    next.date?.getMonth() + 1 === prev.month ||
    next.date?.getMonth() + 1 === next.month
  )
    return false

  if (prev.people[prev.currentPersonIndex])
    for (let holiday of prev.people[prev.currentPersonIndex].holidays.values())
      if ([prev.month, next.month].includes(new Date(holiday).getMonth() + 1))
        return false


  if (next.people[next.currentPersonIndex])
    for (let holiday of next.people[next.currentPersonIndex].holidays.values())
      if ([prev.month, next.month].includes(new Date(holiday).getMonth() + 1))
        return false


  return true
})

const Calendar: React.FC<Props> = ({ people, date, setDate, currentPersonIndex }) => {
  return <div className="calendar-scale">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => {
      return <CalendarItem key={month} month={month} currentPersonIndex={currentPersonIndex} people={people} date={date} setDate={setDate} />
    })}

  </div>
};

export default Calendar;

