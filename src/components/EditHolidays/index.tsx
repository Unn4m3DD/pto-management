import { Box, Button, ButtonGroup, Checkbox, DialogTitle, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useState } from 'react';
import { Person, ReactSetter } from '../../types';
import "./styles.scss"
interface Props {
  people: Person[],
  setPeople: ReactSetter<Person[]>,
}

const EditHolidays: React.FC<Props> = ({ people, setPeople }) => {
  const [selected, setSelected] = useState(new Set(people.map((e, i) => i)))
  return <>
    <DialogTitle>Editar Ferias</DialogTitle>

    <ListItem className="person-item" style={{ display: "flex", paddingRight: "26px" }} >
      <ListItemIcon className="person-item-checkbox">
        <Checkbox
          edge="start"
          checked={selected.size === people.length}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": "Nome" }}
          onClick={() => {
            let newSelected
            if (selected.size === people.length)
              newSelected = new Set()
            else
              newSelected = new Set(people.map((e, i) => i))
            setSelected(newSelected)
          }}
        />
      </ListItemIcon>
      <ListItemText className="person-item-name" id={"Nome"} primary={"Nome"} sx={{ mr: 2 }} />
      <ButtonGroup size="small" aria-label="small secondary button group" className="person-item-count">
        <Button color="primary" style={{ fontSize: ".7rem" }}>
          Ferias<br />Restantes
        </Button>
      </ButtonGroup>
    </ListItem>

    <List
      className="holiday-list"
      style={{ width: "100%", minWidth: "400px", maxWidth: "400px", maxHeight: "500px", overflowY: "auto", overflowX: "visible" }}
    >
      {people.map((item, index) => {
        return (
          <ListItem className="person-item" key={item.name} style={{ display: "flex" }} >
            <ListItemIcon className="person-item-checkbox">
              <Checkbox
                edge="start"
                checked={selected.has(index)}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": item.name }}
                onClick={() => {
                  if (selected.has(index))
                    selected.delete(index)
                  else
                    selected.add(index)
                  setSelected(new Set(selected))
                }}
              />
            </ListItemIcon>
            <ListItemText className="person-item-name" id={item.name} primary={item.name} sx={{ mr: 2 }} />
            <ButtonGroup size="small" aria-label="small secondary button group" className="person-item-count">
              <Button color="primary" onClick={() => {
                people[index].holidayCount = people[index].holidayCount - 1
                setPeople([...people])
              }}>
                -
              </Button>
              <Button color="primary">
                {item.holidayCount - item.holidays.size}
              </Button>
              <Button color="primary" onClick={() => {
                people[index].holidayCount = people[index].holidayCount + 1
                setPeople([...people])
              }}>
                +
              </Button>
            </ButtonGroup>
          </ListItem>
        )
      })}
    </List>
    <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", m: 2 }}>
      <Button
        variant="contained"
        onClick={() => {
          for (let index of selected.values())
            people[index].holidayCount = people[index].holidayCount + 1
          setPeople([...people])
        }}>
        Adicionar aos Selecionados
      </Button>
      <Button
        style={{ marginTop: 10 }}
        variant="contained"
        onClick={() => {
          for (let index of selected.values())
            people[index].holidayCount = people[index].holidayCount - 1
          setPeople([...people])
        }}>
        Remover dos Selecionados
      </Button>
    </Box>
  </>
}

export default EditHolidays;