"use client"

import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Toolbar, Typography } from "@mui/material"
import { useRouter, useSearchParams } from 'next/navigation';

export default function DataAgendamento() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dataAgendamento, setDataAgendamento] = React.useState<string | null >(null);
  const [horarioAgendamento, setHorarioAgendamento] = React.useState<string | null >(null);

  const [datas, setDatas] = React.useState<string[]>([]);

  const [horarios, setHorarios] = React.useState<string[]>([]);

  const especialidadesDataHorario = [{
    id: '1',
    datas: ['13/02/2025', '14/02/2025', '15/02/2025', '16/02/2025'],
    horarios: ['08:30', '09:30', '10:30', '11:30'],
  },
  {
    id: '2',
    datas: ['15/03/2025', '16/03/2025', '17/03/2025', '18/03/2025'],
    horarios: ['18:30', '19:30', '20:30', '21:30'],
  },
  {
    id: '3',
    datas: ['18/05/2025', '19/05/2025', '20/05/2025', '21/05/2025'],
    horarios: ['12:30', '13:30', '14:30', '15:30'],
  }]

  React.useEffect(() => {
    if (localStorage.getItem('cadastro') == null ||
      searchParams.get("esp") == null ||
      searchParams.get("espName") == null) {
      router.push('/agendamento');
    } else {
      const datas = especialidadesDataHorario.find(e=> e.id === searchParams.get("esp")!)?.datas!;
      const horarios = especialidadesDataHorario.find(e=> e.id === searchParams.get("esp")!)?.horarios!;
      setDatas(datas);
      setHorarios(horarios);
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

  const validaCampos = ():boolean =>{
    return horarioAgendamento == null || dataAgendamento == null;
  }

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

      <FormControl variant="filled" fullWidth sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="data-label">Escolha a data de Agendamento</InputLabel>
        <Select fullWidth
          labelId="data-label"
          id="data"
          value={dataAgendamento}
          label="Escolha a data do agendamento"
          onChange={(evento) => setDataAgendamento(evento.target.value)}
        >
         {datas.map((data) => {return (
           <MenuItem value={data}>{data}</MenuItem>
         )})}
        </Select>
      </FormControl>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt'>
        <DatePicker />
      </LocalizationProvider> */}

      <FormControl variant="filled" fullWidth sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="horario-label">Escolha o horario</InputLabel>
        <Select 
          labelId="horario-label"
          id="horario"
          value={horarioAgendamento}
          onChange={(evento) => setHorarioAgendamento(evento.target.value)}
        >
          {horarios.map((horario) => {return (
           <MenuItem value={horario}>{horario}</MenuItem>
         )})}
        </Select>

      </FormControl>

      <Button disabled={validaCampos()} variant="contained" onClick={handleClickOpen}>
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
            Data: {dataAgendamento} {horarioAgendamento}
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
