"use client"

import { Button, Stack } from '@mui/material'
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  return (
    <Stack spacing={2} alignItems={'center'} direction="column">
      <Button variant="contained" onClick={() => router.push('/agendamento')}>Agendar</Button>
      <Button variant="contained" onClick={() => router.push('/retorno')}>Retorno</Button>
    </Stack>
  )
}
