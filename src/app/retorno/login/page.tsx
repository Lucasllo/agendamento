"use client"

import { Button, Stack, TextField, Toolbar, Typography } from "@mui/material"
import { useRouter } from 'next/navigation';
import * as React from 'react';

export default function Login() {
  const router = useRouter();

  const [cpf, setCpf] = React.useState("");

  const validaCampos = (): boolean => {
    return cpf == null;
  }

  const submit = () => {
    localStorage.setItem('token', '1234asdf');
    router.push('/retorno/consultas');
  };

  return (
    <Stack spacing={2} alignItems={'center'} marginX={'auto'} maxWidth={300} direction="column">
      <img src="../logo.png" alt="logo_unifor" />
      <Toolbar>
        <Typography variant="h6" component="div" >
          Login
        </Typography>
      </Toolbar>
      <TextField
        disabled
        id="outlined-disabled"
        label="CPF"
        fullWidth
        value={cpf || ""}
        onChange={evento => setCpf(evento.target.value)}
      />

      <Button disabled={validaCampos()} variant="contained" onClick={() => submit()}>Entrar</Button>
    </Stack>
  )
}
