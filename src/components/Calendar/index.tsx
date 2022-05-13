
import { Badge } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { useState } from "react";
import { Person, ReactSetter } from "../../types";
import { getDay } from "../../utils";
// import { Container } from './styles';

interface Props {
  people: Person[]
  date?: Date
  setDate: ReactSetter<Date>
  currentPersonIndex: number | undefined
}

const Calendar: React.FC<Props> = ({ people, date, setDate, currentPersonIndex }) => {
  console.log(date)
  return <div className="calendar-scale">
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CalendarPicker
        renderDay={(
          currentDate,
          selectedDates,
          pickersDayProps
        ) => {
          const day = getDay(currentDate)
          let count = 0
          for (let item of people) {
            if (item.holidays.includes(day)) {
              count++
            }
          }

          const style = (date === undefined && currentPersonIndex !== undefined && people[currentPersonIndex].holidays.includes(day)) ? {
            style: {
              color: "white",
              backgroundColor: "#1565c0"
            }
          } : {}
          return <Badge
            key={pickersDayProps.key}
            overlap="circular"
            color="secondary"
            badgeContent={count !== 0 ? count : undefined}
          >
            <PickersDay {...style} {...pickersDayProps} />
          </Badge>

        }}
        date={date} onChange={(newDate) => setDate(newDate)}
      />
    </LocalizationProvider>
  </div>
};

export default Calendar;

