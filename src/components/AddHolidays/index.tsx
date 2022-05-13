import { Box, Button, Checkbox, DialogTitle, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useState } from 'react';
import { Person, ReactSetter } from '../../types';

interface Props {
  people: Person[],
  setPeople: ReactSetter<Person[]>,
}

const AddHolidays: React.FC<Props> = ({ people, setPeople }) => {
  const [selected, setSelected] = useState(new Set(people.map((e, i) => i)))
  return <>
    <DialogTitle>Adicionar Feriados</DialogTitle>

    <ListItem style={{ minWidth: "300px", maxWidth: "300px" }}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={selected.size === people.length}
          tabIndex={-1}
          disableRipple
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
      <ListItemText id={"Nome"} primary={"Nome"} sx={{ mr: 2 }} />
    </ListItem>
    <List style={{ width: "100%", minWidth: "300px", maxWidth: "300px", maxHeight: "500px", overflowY: "auto" }}>
      {people.map((item, index) => {
        return (
          <ListItem key={item.name} >
            <ListItemIcon>
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
            <ListItemText id={item.name} primary={item.name} sx={{ mr: 2 }} />
          </ListItem>
        )
      })}
    </List>
    <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
      <Button
        variant="contained"
        onClick={() => {
          for (let index of selected.values())
            people[index].holidayCount = people[index].holidayCount + 1
          setPeople([...people])
        }}>
        Adicionar Feriados
      </Button>
    </Box>
  </>
}

export default AddHolidays;