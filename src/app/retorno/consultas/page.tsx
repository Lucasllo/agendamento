"use client"

import { Button, Divider, IconButton, List, ListItem, ListItemText, Stack, TextField, Toolbar, Typography } from "@mui/material"
import { useRouter } from 'next/navigation';
import * as React from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

export default function Consultas() {
  const router = useRouter();

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

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const [especialidades, setEspecialidades] = React.useState(especialidade);

  const [buscar, setBuscar] = React.useState("");

  const [lista, setLista] = React.useState(especialidade);

  function testaBusca(nome: string) {
    const regex = new RegExp(buscar, 'i');
    return regex.test(nome);
  }

  React.useEffect(() => {
    const novaLista = especialidades.filter(item => testaBusca(item.nome))
    setLista(novaLista);
  }, [buscar])

  const submit = (id: string, nome: string) => {
    let retorno = {
      ...JSON.parse(localStorage.getItem('retorno')!),
      especialidadeId: id
    }
    localStorage.setItem('retorno', JSON.stringify(retorno));

    router.push('/retorno/agendamento' + "?" + createQueryString("esp", id) + "&" + createQueryString("espName", nome), {})
  };

  return (
    <Stack spacing={2} alignItems={'center'} marginX={'auto'} maxWidth={300} direction="column">
      <img src="../logo.png" alt="logo_unifor" />
      <Toolbar>
        <Typography variant="h6" component="div" >
          Consultas Anteriores
        </Typography>
      </Toolbar>
      <TextField id="outlined-basic" size='small' fullWidth label="Pesquise por especialidade" variant="outlined" value={buscar} onChange={evento => setBuscar(evento.target.value)} />

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

        {lista.map((item) => {
          return (
            <div key={item.id}>
              <ListItem alignItems="flex-start" secondaryAction={
                <IconButton edge="end" aria-label="acesso" onClick={() => submit(item.id, item.nome)}>
                  <ArrowForwardRoundedIcon />
                </IconButton>
              }>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        component="p"
                        variant="body1"
                        sx={{ display: 'block', fontWeight: 'bold' }}
                      >
                        {item.nome}
                      </Typography>
                      {""}
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'text.primary', display: 'block' }}
                      >
                        Data: {item.data}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'text.primary', display: 'block' }}
                      >
                        Médico Responsavel: {item.medico}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="fullWidth" component="li" />
            </div>
          )
        })}

      </List>
    </Stack>
  )
}
