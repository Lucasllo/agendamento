"use client"

import * as React from 'react';
import { Button, InputAdornment, Stack, TextField, Toolbar, Typography, } from "@mui/material"
import { useRouter, useSearchParams } from 'next/navigation';

export default function Cadastro() {
  const router = useRouter();
  const searchParams = useSearchParams();


  const [cpf, setCpf] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [nascimento, setNascimento] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if (localStorage.getItem('cadastro') == null ||
      searchParams.get("esp") == null ||
      searchParams.get("espName") == null) {
      router.push('/agendamento');
    } else {
      setNome(JSON.parse(localStorage.getItem('cadastro')!)?.nome);
      setCpf(JSON.parse(localStorage.getItem('cadastro')!)?.cpf);
      setNascimento(JSON.parse(localStorage.getItem('cadastro')!)?.nascimento);
      setEmail(JSON.parse(localStorage.getItem('cadastro')!)?.email);
    }
  }, []);


  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const submit = () => {
    let cadastro = {
      ...JSON.parse(localStorage.getItem('cadastro')!),
      nome: nome,
      cpf: cpf,
      nascimento: nascimento,
      email: email,
      especialidadeId: searchParams.get("esp")!
    }
    localStorage.setItem('cadastro', JSON.stringify(cadastro));

    router.push('/agendamento/dataAgendamento' + "?" + createQueryString("esp", searchParams.get("esp")!) + "&" + createQueryString("espName", searchParams.get("espName")!))
  };


  return (
    <Stack spacing={2} alignItems={'center'} marginX={'auto'} maxWidth={360} direction="column">
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
        required
        id="outlined-required"
        label="CPF"
        fullWidth
        value={cpf || ""}
        onChange={evento => setCpf(evento.target.value)}
        //fazer envio para verificar o cpf
        onPointerOut={() => { }}
      />
      <TextField
        required
        id="outlined-required"
        label="Nome Completo"
        fullWidth
        value={nome || ""}
        onChange={evento => setNome(evento.target.value)}
      />
      <TextField
        required
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
        required
        id="outlined-required"
        label="Email"
        type='email'
        fullWidth
        value={email || ""}
        onChange={evento => setEmail(evento.target.value)}
      />

      <Button variant="contained" onClick={() => submit()}>Escolher Data</Button>
    </Stack>
  )
}
