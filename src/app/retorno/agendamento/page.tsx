"use client"

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Stack, TextField, Toolbar, Typography } from "@mui/material"
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

export default function Agendamento() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const especialidade = [{
    id: '1',
    nome: 'Cardiologia',
    data: '12/03/2024',
    medico: 'Dra. Rosa Maria',
  },
  {
    id: '2',
    nome: 'Radiologia',
    data: '24/07/2024',
    medico: 'Dra. Alexandra Matos',
  },
  {
    id: '3',
    nome: 'Oftalmologia',
    data: '04/10/2024',
    medico: 'Dr. Joao Junior',
  }]

  const [cpf, setCpf] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [nascimento, setNascimento] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [dataAgendamento, setDataAgendamento] = React.useState<string | null>(null);
  const [horarioAgendamento, setHorarioAgendamento] = React.useState<string | null>(null);

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
    if (localStorage.getItem('retorno') == null ||
      searchParams.get("esp") == null ||
      searchParams.get("espName") == null) {
      router.push('/');
    } else {
      const datas = especialidadesDataHorario.find(e => e.id === searchParams.get("esp")!)?.datas!;
      const horarios = especialidadesDataHorario.find(e => e.id === searchParams.get("esp")!)?.horarios!;
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
    let cadastro = {
      ...JSON.parse(localStorage.getItem('cadastro')!),
      dataAgendamento: dataAgendamento,
      horarioAgendamento: horarioAgendamento
    }
    localStorage.setItem('comprovante', JSON.stringify(cadastro));
    localStorage.removeItem('cadastro')
    router.push('/retorno/comprovante');
    setOpen(false);
  };


  const validaCampos = (): boolean => {
    return cpf == null || nome == null || nascimento == null || email == null;
  }

  return (
    <Stack spacing={2} alignItems={'center'} marginX={'auto'} maxWidth={300} direction="column">
      <img src="../logo.png" alt="logo_unifor" />
      <Toolbar>
        <Typography variant="h6" component="div" >
          Cadastro
        </Typography>
      </Toolbar>
      <TextField
        disabled
        id="outlined-disabled"
        label="Especialidade"
        fullWidth
        defaultValue={searchParams.get("espName")}
      />
      <TextField
        disabled
        id="outlined-required"
        label="CPF"
        fullWidth
        value={cpf || ""}
        onChange={evento => setCpf(evento.target.value)}
        //fazer envio para verificar o cpf
        onPointerOut={() => { }}
      />
      <TextField
        disabled
        id="outlined-required"
        label="Nome Completo"
        fullWidth
        value={nome || ""}
        onChange={evento => setNome(evento.target.value)}
      />
      <TextField
        disabled
        id="outlined-required"
        label="Data de Nascimento"
        fullWidth
        type='date'
        value={nascimento || ""}
        onChange={evento => setNascimento(evento.target.value)}
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          },
        }}
      />
      <TextField
        disabled
        id="outlined-required"
        label="Email"
        type='email'
        fullWidth
        value={email || ""}
        onChange={evento => setEmail(evento.target.value)}
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
          {datas.map((data, index) => {
            return (
              <MenuItem key={index} value={data}>{data}</MenuItem>
            )
          })}
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
          {horarios.map((horario, index) => {
            return (
              <MenuItem key={index} value={horario}>{horario}</MenuItem>
            )
          })}
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
            Médico: {especialidade.find((m) => m.id === searchParams.get("esp")!)?.medico}
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
