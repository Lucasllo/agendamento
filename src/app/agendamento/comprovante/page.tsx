"use client"

import * as React from 'react';
import { Alert, AlertTitle, Button, Stack, Toolbar, Typography } from "@mui/material"
import { useRouter } from 'next/navigation';
import pdfMake from 'pdfmake/build/pdfmake'
import comprovantePDF from './arquivo';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

export default function Comprovante() {
    const router = useRouter();
    const dados: TDocumentDefinitions | null = null 
    const [imagem, setImagem] = React.useState('');
    
    React.useEffect(() => {
        const dados: TDocumentDefinitions = comprovantePDF(JSON.parse(localStorage.getItem('comprovante')!));
        const pdfDocGenerator = pdfMake.createPdf(dados!);
        pdfDocGenerator.getDataUrl((data) => {
            setImagem(data);
        });
    }, []);
    
    function download(){
        const dados: TDocumentDefinitions = comprovantePDF(JSON.parse(localStorage.getItem('comprovante')!));
        pdfMake.createPdf(dados!).download()
    }
    return(
        <Stack spacing={2} alignItems={'center'} marginX={'auto'} maxWidth={360} direction="column">
            <Toolbar>
                <Typography variant="h6" component="div" >
                Comprovante de Agendamento
                </Typography>
            </Toolbar>
            <Alert severity="success">
                <AlertTitle>Marcação realizada com sucesso.</AlertTitle>
                Faça download do comprovante para salvar as informações
            </Alert>
            <iframe min-width="300"
                height="250" src={imagem} className='iframe'></iframe>
            <Button  variant="contained" onClick={(e) => download()}>
                Download
            </Button>
            <Button  variant="contained" onClick={(e) => router.push('/', {})}>
                Voltar para pagina inicial
            </Button>
        </Stack>
    )
}