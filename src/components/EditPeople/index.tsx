import { Box, Button, Dialog, DialogActions, DialogTitle, List, ListItem, ListItemIcon, Snackbar, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { Person, ReactSetter } from "../../types";

import DeleteIcon from '@mui/icons-material/Delete';
interface Props {
  people: Person[]
  setPeople: ReactSetter<Person[]>
  deletedPeople: Person[]
  setDeletedPeople: ReactSetter<Person[]>
}

const EditPeople: React.FC<Props> = ({ people, setPeople, deletedPeople, setDeletedPeople }) => {
  const [newPersonName, setNewPersonName] = useState("")
  const [addError, setAddError] = useState<string>()
  const [personToDeleteIndex, setPersonToDelete] = useState<number>()
  return <>
    <DialogTitle>
      <Box> Editar Pessoas </Box>
    </DialogTitle>

    <ListItem>
      <ListItemIcon>
      </ListItemIcon>
      <TextField
        value={newPersonName}
        onChange={(e) => setNewPersonName(e.target.value)}
      />
      <Button
        color="primary"
        size="small"
        style={{ borderRadius: 28 }}
        onClick={() => {
          if (people.map(e => e.name).includes(newPersonName)) {
            setAddError("Já existe uma pessoa com este nome!")
            return
          }
          if (newPersonName === "") {
            setAddError("Adicione um nome antes de adicionar uma nova pessoa!")
            return
          }
          setPeople([...people, {
            name: newPersonName,
            holidayCount: 0,
            holidays: new Set(),
            selected: true
          }])
        }}
      >
        +
      </Button>
    </ListItem>


    <List sx={{ overflow: "auto" }}>
      {people.map((item, index) => {
        return (
          <ListItem key={item.name} className="person-item">
            <Button className="person-item-name">{item.name}</Button>
            <Button color="secondary" size="small" onClick={() => {
              setPersonToDelete(index)
            }}>
              <DeleteIcon />
            </Button>
          </ListItem>
        );
      })}
    </List>


    <Dialog
      open={personToDeleteIndex !== undefined}
      onClose={() => setPersonToDelete(undefined)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Deseja eliminar esta pessoa?
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => {
          setDeletedPeople([...deletedPeople, people[personToDeleteIndex]])
          people.splice(personToDeleteIndex, 1)
          setPeople([...people])
          setPersonToDelete(undefined)
        }}
        >Confirmar</Button>
        <Button onClick={() => {
          setPersonToDelete(undefined)
        }} autoFocus>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog >

    <Snackbar
      open={addError !== undefined}
      autoHideDuration={6000}
      onClose={() => setAddError(undefined)}
      message={addError}
    />
  </>
}

export default EditPeople;