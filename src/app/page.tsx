"use client"

import * as React from 'react';
import { Button, Stack } from '@mui/material'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  React.useEffect(() => {
    localStorage.removeItem('comprovante');
    localStorage.removeItem('token');
    localStorage.removeItem('cadastro');
  }, []);

  return (
    <Stack spacing={4} alignItems={'center'} marginX={'auto'} maxWidth={300} direction="column">
      <img src="logo.png" alt="logo_unifor" />
      <Button fullWidth variant="contained" onClick={() => router.push('/agendamento')}>Agendar</Button>
      <Button fullWidth variant="contained" onClick={() => router.push('/retorno')}>Retorno</Button>
    </Stack>
  )
}
