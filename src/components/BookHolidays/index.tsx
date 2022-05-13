import { Box, Button, Dialog, DialogTitle, Snackbar, Typography } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { useState } from "react";
import { Person, ReactSetter } from "../../types";
import { getDay } from "../../utils";
import EditHolidays from "../EditHolidays";

interface Props {
  people: Person[]
  setPeople: ReactSetter<Person[]>
  currentPersonIndex: number
  setBookingHolidays: ReactSetter<boolean>
}

const BookHolidays: React.FC<Props> = ({ people, setPeople, currentPersonIndex, setBookingHolidays }) => {
  const [dateError, setDateError] = useState<string>()
  const currentPerson = people[currentPersonIndex]
  const [dates, setDates] = useState<Set<number>>(new Set(currentPerson.holidays))
  const spareDays = currentPerson.holidayCount - dates.size
  return <>
    <DialogTitle>
      <Box> Ferias: {currentPerson.name} </Box>
      <Box>{spareDays} dia{spareDays > 1 || spareDays === 0 ? "s" : ""} restatante{spareDays > 1 || spareDays === 0 ? "s" : ""}</Box>
    </DialogTitle>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CalendarPicker
        allowSameDateSelection
        shouldDisableDate={(date) => date.getDay() === 6}
        renderDay={(
          date,
          selectedDates,
          pickersDayProps
        ) => {
          const day = getDay(date)
          const style =
            dates.has(day) ? { style: { backgroundColor: "#1565c0", color: "white" } } :
              date.getDay() === 6 ? { style: { backgroundColor: "#222", color: "white" } } :
                { style: { backgroundColor: "white", color: "black" } }
          return <PickersDay  {...style} {...pickersDayProps} />

        }}
        date={new Date()}
        onChange={
          (newDate) => {
            const newDay = getDay(newDate)
            if (currentPerson.holidayCount <= dates.size && !dates.has(newDay)) {
              setDateError("Esta pessoa já reservou todos os dias disponiveis!")
              return
            }
            if (dates.has(newDay))
              dates.delete(newDay)
            else
              dates.add(newDay)
            setDates(new Set(dates))
          }
        }
      />
    </LocalizationProvider>
    <Button onClick={() => {
      currentPerson.holidays = [...dates]
      setPeople([...people])
      setBookingHolidays(false)
    }}>Marcar Ferias</Button>
    <Snackbar
      open={dateError !== undefined}
      autoHideDuration={6000}
      onClose={() => setDateError(undefined)}
      message={dateError}
    />
  </>
}

export default BookHolidays;