import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Person, ReactSetter } from "../../types";
import { Box, Button, ButtonGroup, Dialog, DialogTitle } from "@material-ui/core";
import { useState } from "react";
import EditHolidays from "../EditHolidays";
import "./styles.scss";
import { download, readFile } from "../../utils";
interface Props {
  people: Person[],
  setPeople: ReactSetter<Person[]>,
  deletedPeople: Person[],
  setDeletedPeople: ReactSetter<Person[]>,
  setCurrentPersonIndex: ReactSetter<number>,
  setShowEditPeople: ReactSetter<boolean>
}

const PeopleList: React.FC<Props> = ({ people, setPeople, setCurrentPersonIndex, setShowEditPeople, deletedPeople, setDeletedPeople }) => {
  const [showEditHoliday, setShowEditHoliday] = useState(false)
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
                style={{ color: item.color }}
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
                {item.holidayCount - item.holidays.size}
              </Button>
            </ButtonGroup>
          </ListItem>
        );
      })}
    </List>
    <Box sx={{ display: "flex", width: "100%", justifyContent: "center", my: 2 }}>
      <Button style={{ marginRight: 15, marginLeft: 15 }} variant="contained" onClick={() => setShowEditPeople(e => !e)}>Editar Pessoas</Button>
      <Button style={{ marginRight: 15, marginLeft: 15 }} variant="contained" onClick={() => setShowEditHoliday(e => !e)}>Editar Ferias</Button>
    </Box>
    <Box sx={{ display: "flex", width: "100%", justifyContent: "center", my: 2 }}>
      <Button style={{ marginRight: 15, marginLeft: 15 }} variant="contained"
        onClick={() => {
          download(people.map(e => `${e.name}: ${[...e.holidays].map(d => new Date(d).toLocaleDateString("pt")).join(", ")}`).join("\n"))
        }}
      >Contabilidade</Button>
      <Button style={{ marginRight: 15, marginLeft: 15 }} variant="contained"
        onClick={async () => {
          const file = JSON.parse(await readFile())
          localStorage.setItem("data", JSON.stringify(file))
          document.location.reload()
        }}
      >Importar</Button>
      <Button style={{ marginRight: 15, marginLeft: 15 }} variant="contained"
        onClick={() => {
          const file = JSON.stringify({
            people: people.map(e => ({ ...e, holidays: [...e.holidays] })),
            deletedPeople: deletedPeople.map(e => ({ ...e, holidays: [...e.holidays] })),
          })
          localStorage.setItem("data", JSON.stringify(file))
          download(file)
        }}
      >Gravar</Button >
    </Box >
    <Dialog onClose={() => setShowEditHoliday(e => !e)} open={showEditHoliday}>
      <EditHolidays people={people} setPeople={setPeople} />
    </Dialog>
  </Box >;
};

export default PeopleList;
