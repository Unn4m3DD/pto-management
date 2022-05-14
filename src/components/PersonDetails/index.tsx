import { Box, Button, Divider, List, ListItem, Typography } from "@material-ui/core";
import { Person, ReactSetter } from "../../types";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./styles.scss"
interface Props {
  people: Person[],
  setPeople: ReactSetter<Person[]>,
  currentPersonIndex: number,
  setCurrentPersonIndex: ReactSetter<number | undefined>,
  setDate: ReactSetter<Date>,
  setBookingHolidays: ReactSetter<boolean>
}

const PersonDetails: React.FC<Props> = ({ people, setPeople, currentPersonIndex, setDate, setCurrentPersonIndex, setBookingHolidays }) => {
  const currentPerson = people[currentPersonIndex]
  return <Box className="person-details">
    <Button onClick={() => setCurrentPersonIndex(undefined)}><ArrowBackIcon /></Button>
    <Typography style={{ marginTop: "15px" }} variant="h3">{currentPerson.name}</Typography>
    <Button
      onClick={() => {
        setBookingHolidays(true)
      }}
      style={{ marginTop: "15px" }} variant="contained">Marcar Ferias</Button>
    <Typography style={{ marginTop: "15px" }} variant="h5">Ferias Marcadas:</Typography>
    <List className="dates-list">
      {[...currentPerson.holidays.values()].map((item, index) => {
        const itemDate = new Date(item)
        return <ListItem className="date-item" key={index}>
          <Button onClick={() => setDate(itemDate)}>
            {itemDate.toLocaleDateString("pt")}
          </Button>
        </ListItem>
      })}
    </List>
  </Box>;
}

export default PersonDetails;