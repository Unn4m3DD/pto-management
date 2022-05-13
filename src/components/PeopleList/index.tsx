import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Person, ReactSetter } from "../../types";
import { Box, Button, ButtonGroup, Dialog, DialogTitle } from "@material-ui/core";
import { useState } from "react";
import AddHolidays from "../AddHolidays";
import "./styles.scss";
interface Props {
  people: Person[],
  setPeople: ReactSetter<Person[]>,
  setCurrentPersonIndex: ReactSetter<number>,
  setShowEditPeople: ReactSetter<boolean>
}

const PeopleList: React.FC<Props> = ({ people, setPeople, setCurrentPersonIndex, setShowEditPeople }) => {
  const [showAddHoliday, setShowAddHoliday] = useState(false)
  return <Box style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column" }}>
    <ListItem className="person-item" style={{ paddingRight: "26px" }}>
      <ListItemIcon className="person-item-checkbox">
        <Checkbox
          edge="start"
          checked={people.reduce((acc, next) => acc && next.selected, true)}
          disableRipple
          onChange={(e) => {
            people.forEach((item) => item.selected = e.target.checked)
            setPeople([...people])
          }}
        />
      </ListItemIcon>
      <Button className="person-item-name">Nome</Button>
      <ButtonGroup aria-label="small secondary button group" className="person-item-count">
        <Button color="primary" size="small" style={{ fontSize: ".6rem" }}>
          Ferias<br />Restantes
        </Button>
      </ButtonGroup>
    </ListItem>
    <List sx={{ overflow: "auto" }}>
      {people.map((item, index) => {
        return (
          <ListItem key={item.name} className="person-item">
            <ListItemIcon className="person-item-checkbox">
              <Checkbox
                edge="start"
                checked={item.selected}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": item.name }}
                onClick={() => {
                  people[index].selected = !people[index].selected
                  setPeople([...people])
                }}
              />
            </ListItemIcon>
            <Button className="person-item-name" onClick={() => setCurrentPersonIndex(index)}>{item.name}</Button>
            <ButtonGroup aria-label="small secondary button group" className="person-item-count">
              <Button color="primary" size="small">
                {item.holidayCount}
              </Button>
            </ButtonGroup>
          </ListItem>
        );
      })}
    </List>
    <Box sx={{ display: "flex", width: "100%", justifyContent: "center", my: 2 }}>
      <Button style={{ marginRight: 15, marginLeft: 15 }} variant="contained" onClick={() => setShowEditPeople(e => !e)}>Editar Pessoas</Button>
      <Button style={{ marginRight: 15, marginLeft: 15 }} variant="contained" onClick={() => setShowAddHoliday(e => !e)}>Adicionar Feriados</Button>
    </Box>
    <Dialog onClose={() => setShowAddHoliday(e => !e)} open={showAddHoliday}>
      <AddHolidays people={people} setPeople={setPeople} />
    </Dialog>
  </Box>;
};

export default PeopleList;
