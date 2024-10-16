"use client"

import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, MenuItem, Select, Stack, TextField, Toolbar, Typography } from "@mui/material"
import { useRouter, useSearchParams } from 'next/navigation';

export default function DataAgendamento() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dataAgendamento, setDataAgendamento] = React.useState("");
  const [horarioAgendamento, setHorarioAgendamento] = React.useState("");

  React.useEffect(() => {
    if (localStorage.getItem('cadastro') == null ||
      searchParams.get("esp") == null ||
      searchParams.get("espName") == null) {
      router.push('/agendamento');
    } else {
      setDataAgendamento(JSON.parse(localStorage.getItem('cadastro')!)?.dataAgendamento);
      setHorarioAgendamento(JSON.parse(localStorage.getItem('cadastro')!)?.horarioAgendamento);
    }
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAccept = () => {
    localStorage.removeItem('cadastro')
    router.push('/agendamento');
    setOpen(false);
  };

  return (
    <Stack spacing={2} alignItems={'center'} marginX={'auto'} maxWidth={360} direction="column">
      <Toolbar>
        <Typography variant="h6" component="div" >
          Data de Agendamento
        </Typography>
      </Toolbar>
      <TextField
        disabled
        id="outlined-disabled"
        label="Especialidade"
        fullWidth
        defaultValue={searchParams.get("espName")!}
      />

      <InputLabel id="data-label">Informe a data de Agendamento</InputLabel>
      <Select fullWidth
        labelId="data-select-label"
        id="data"
        value={'10'}
        label="Escolha a data do agendamento"
        onChange={(evento) => setDataAgendamento(evento.target.value)}
      >
        <MenuItem value={'10'}>Ten</MenuItem>
        <MenuItem value={'20'}>Twenty</MenuItem>
        <MenuItem value={'30'}>Thirty</MenuItem>
      </Select>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt'>
        <DatePicker />
      </LocalizationProvider> */}

      <InputLabel id="horario-label">Escolha o horario</InputLabel>
      <Select fullWidth
        labelId="horario-select-label"
        id="horario"
        value={'10'}
        label="Escolha o horario"
        onChange={(evento) => setHorarioAgendamento(evento.target.value)}
      >
        <MenuItem value={'10'}>Ten</MenuItem>
        <MenuItem value={'20'}>Twenty</MenuItem>
        <MenuItem value={'30'}>Thirty</MenuItem>
      </Select>

      <Button variant="contained" onClick={handleClickOpen}>
        Agendar
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
            {searchParams.get("espName")!}
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
