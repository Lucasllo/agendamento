"use client"

import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material"
import { useRouter } from 'next/navigation';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';

export default function DataAgendamento() {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAccept = () => {
    router.push('/agendamento');
    setOpen(false);
  };

  return (
    <Stack spacing={2} alignItems={'center'} marginX={'auto'} maxWidth={360} direction="column">
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select fullWidth
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={10}
        label="Age"
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>

      <InputLabel id="data-label">Informe a data</InputLabel>
      <Select fullWidth
        labelId="data-select-label"
        id="data"
        value={10}
        label="Escolha o horario"
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt'>
        <DatePicker />
      </LocalizationProvider> */}

      <InputLabel id="horario-label">Escolha o horario</InputLabel>
      <Select fullWidth
        labelId="horario-select-label"
        id="horario"
        value={10}
        label="Escolha o horario"
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>

      <TextField
        disabled
        id="outlined-disabled"
        label="Especialidade"
        fullWidth
        defaultValue="Cardiologia"
      />

      <Button variant="contained" onClick={() => router.push('/agendamento')}>Agendar</Button>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Você confirma?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Médico: Dr Fabiano Mendes
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Consulta: Cardiologia
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Data: 17/08/2024 08:20
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Não</Button>
          <Button onClick={handleCloseAccept} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}
