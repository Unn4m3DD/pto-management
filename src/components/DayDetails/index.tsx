import { Box, Button, Divider, List, ListItem, Typography } from "@material-ui/core";
import { Person, ReactSetter } from "../../types";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./styles.scss"
import { getDay } from "../../utils";
interface Props {
  people: Person[]
  date: Date
  setDate: ReactSetter<Date | undefined>
  setCurrentPersonIndex: ReactSetter<number | undefined>
}

const DayDetails: React.FC<Props> = ({ people, date, setDate, setCurrentPersonIndex }) => {
  const selectedDay = getDay(date)
  return <Box className="person-details">
    <Button onClick={() => setDate(undefined)}><ArrowBackIcon /></Button>
    <Typography variant="h3">
      {date.toLocaleDateString("pt")}
    </Typography>
    <List className="dates-list">
      {people.map((e, index) => ({ ...e, index })).filter(e => e.holidays.has(selectedDay)).map((item, index) => {
        return <ListItem className="date-item">
          <Button
            onClick={() => {
              setDate(undefined)
              setCurrentPersonIndex(item.index)
            }}
          >
            {item.name}
          </Button>
        </ListItem>
      })}
    </List>
  </Box>;
}

export default DayDetails;