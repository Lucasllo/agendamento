import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { Content, ContextPageSize, DynamicContent, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

function comprovantePDF(dados: any): TDocumentDefinitions {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle: Content = [{
        text: 'Comprovante de Marcação de Retorno',
        alignment: 'center',
        fontSize: 20,
        bold: true,
        margin: [15, 20, 0, 45] //left, top, right, bottom
    }];

    const details: Content = [
        { text: 'Informações', style: 'header' },
        {
            table: {
                headerRows: 1,
                widths: ['*', '*', '*', '*'],
                body: [
                    ['Nome', 'Data de consulta', 'Horario', 'Medico'],
                    [dados?.nome, dados?.dataAgendamento, dados?.horarioAgendamento, 'Dr. Mauricio']
                ]
            },
            layout: 'headerLineOnly',
            fontSize: 10,
            bold: true,
        }];

    function Rodape(currentPage: number, pageCount: number, pageSize: ContextPageSize): Content | null | undefined {
        return [
            {
                text: 'Endereço: Rua Maramaldo Campelo, nº 50 - Edson Queiroz, Fortaleza - CE, 60811-640',
                fontSize: 10,
                bold: true,
                margin: [15, 10, 0, 0] //left, top, right, bottom
            }
        ]
    }

    const styles: StyleDictionary = {
        header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
        }
    }

    const docDefinitios: TDocumentDefinitions = {
        pageSize: 'A5',
        pageOrientation: 'landscape',
        pageMargins: [15, 50, 15, 40],
        header: [reportTitle],
        content: [details],
        footer: Rodape,
        styles: styles
    }

    return docDefinitios;
    // pdfMake.createPdf(docDefinitios).download();
}

export default comprovantePDF;