"use client"

import * as React from 'react';
import { Divider, IconButton, List, ListItem, ListItemText, Stack, TextField, Toolbar, Typography } from "@mui/material"
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useRouter } from 'next/navigation';

export default function Agendamento() {
  const router = useRouter();

  return (
    <Stack spacing={2} alignItems={'center'} marginX={'auto'} maxWidth={360} direction="column">
      <Toolbar>
        <Typography variant="h6" component="div" >
          Especialidades
        </Typography>
      </Toolbar>
      <TextField id="outlined-basic" size='small' fullWidth label="Pesquise uma especialidade" variant="outlined" />

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem alignItems="flex-start" secondaryAction={
          <IconButton edge="end" aria-label="acesso" onClick={() => router.push('/agendamento/cadastro')}>
            <ArrowForwardRoundedIcon />
          </IconButton>
        }>
          <ListItemText
            primary="Cardiologia"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: 'text.primary', display: 'block' }}
                >
                  Preço: R$ 189,00
                </Typography>
                {""}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="fullWidth" component="li" />
        <ListItem alignItems="flex-start" secondaryAction={
          <IconButton edge="end" aria-label="acesso">
            <ArrowForwardRoundedIcon />
          </IconButton>
        }>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: 'text.primary', display: 'inline' }}
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="fullWidth" component="li" />
        <ListItem alignItems="flex-start" secondaryAction={
          <IconButton edge="end" aria-label="acesso">
            <ArrowForwardRoundedIcon />
          </IconButton>
        }>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: 'text.primary', display: 'inline' }}
                >
                  Sandra Adams
                </Typography>
                {' — Do you have Paris recommendations? Have you ever…'}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Stack>
  )
}
