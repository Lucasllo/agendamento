"use client"

import * as React from 'react';
import { Button, Stack } from "@mui/material"
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
            <iframe min-width="300"
                height="250" src={imagem} className='iframe'></iframe>
            <Button  variant="contained" onClick={(e) => download()}>
                Downlaod
            </Button>
            <Button  variant="contained" onClick={(e) => router.push('/', {})}>
                Voltar para pagina inicial
            </Button>
        </Stack>
    )
}