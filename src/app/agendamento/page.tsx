"use client"

import * as React from 'react';
import { Divider, IconButton, List, ListItem, ListItemText, Stack, TextField, Toolbar, Typography } from "@mui/material"
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useRouter } from 'next/navigation';

export default function Agendamento() {
  const router = useRouter();


  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const especialidade = [{
    id: '1',
    nome: 'Cardiologia',
    preço: '189,00',
  },
  {
    id: '2',
    nome: 'Radiologia',
    preço: '200,00',
  },
  {
    id: '3',
    nome: 'Oftalmologia',
    preço: '180,00',
  }]

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
    let cadastro = {
      ...JSON.parse(localStorage.getItem('cadastro')!),
      especialidadeId: id
    }
    localStorage.setItem('cadastro', JSON.stringify(cadastro));

    router.push('/agendamento/cadastro' + "?" + createQueryString("esp", id) + "&" + createQueryString("espName", nome), {})
  };

  return (
    <Stack spacing={2} alignItems={'center'} marginX={'auto'} maxWidth={360} direction="column">
      <Toolbar>
        <Typography variant="h6" component="div" >
          Especialidades
        </Typography>
      </Toolbar>
      <TextField id="outlined-basic" size='small' fullWidth label="Pesquise uma especialidade" variant="outlined" value={buscar} onChange={evento => setBuscar(evento.target.value)} />

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
                        sx={{ display: 'block' }}
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
                        Preço: R$ {item.preço}
                      </Typography>
                      {""}
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
