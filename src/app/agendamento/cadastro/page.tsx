"use client"

import * as React from 'react';
import { Button, InputAdornment, Stack, TextField, } from "@mui/material"
import { useRouter } from 'next/navigation';

export default function Cadastro() {
  const router = useRouter();

  return (
    <Stack spacing={2} alignItems={'center'} marginX={'auto'} maxWidth={360} direction="column">
      <TextField
        required
        id="outlined-required"
        label="CPF"
        fullWidth
      />
      <TextField
        required
        id="outlined-required"
        label="Nome Completo"
        fullWidth
      />
      <TextField
        required
        id="outlined-required"
        label="Data de Nascimento"
        fullWidth
        type='date'
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
        fullWidth
      />
      <TextField
        disabled
        id="outlined-disabled"
        label="Especialidade"
        fullWidth
        defaultValue="Cardiologia"
      />

      <Button variant="contained" onClick={() => router.push('/agendamento/dataAgendamento')}>Escolher Data</Button>
    </Stack>
  )
}
