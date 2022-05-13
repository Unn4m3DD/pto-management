
import { Badge } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { useState } from "react";
import { Person, ReactSetter } from "../../types";
import { getDay } from "../../utils";
// import { Container } from './styles';

const Calendar: React.FC<{ people: Person[], date: Date, setDate: ReactSetter<Date> }> = ({ people, date, setDate }) => {
  return <div className="calendar-scale">
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CalendarPicker
        renderDay={(
          date,
          selectedDates,
          pickersDayProps
        ) => {
          const day = getDay(date)
          let count = 0
          for (let item of people) {
            if (item.holidays.includes(day)) {
              count++
            }
          }
          return <Badge
            key={pickersDayProps.key}
            overlap="circular"
            color="secondary"
            badgeContent={count !== 0 ? count : undefined}
          >
            <PickersDay {...pickersDayProps} />
          </Badge>

        }}
        date={date} onChange={(newDate) => setDate(newDate)}
      />
    </LocalizationProvider>
  </div>
};

export default Calendar;

