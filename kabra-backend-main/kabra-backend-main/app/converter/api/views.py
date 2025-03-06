from io import BytesIO
import mimetypes
import os
from pathlib import Path
import tempfile
from wsgiref.util import FileWrapper
import zipfile
from django.http import FileResponse, HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from gotenberg_client import GotenbergClient
from pypdf import PdfWriter, PdfReader
from converter.api.word_converter import gerar_documento


class PdfView(APIView):
    def post(self, request):
        # Obter a lista e o JSON do corpo da solicitação
        listas = request.data.get('lista')
        json_data = request.data.get('json')

        # Configurar o cliente Gotenberg
        gotenberg_client = GotenbergClient("http://gotenberg:3000")

        # Lista para armazenar os caminhos temporários dos documentos gerados
        docx_paths = []

        # Iterar sobre cada membro da lista
        for membro in listas:
            # Use a função gerar_documento para obter o documento em formato BytesIO
            docx_output = gerar_documento(membro, json_data)

            # Criar um arquivo temporário
            temp_file = tempfile.NamedTemporaryFile(
                suffix='.docx', delete=False)
            temp_file.write(docx_output.getvalue())
            temp_file.close()

            docx_paths.append(temp_file.name)

        # Criar um objeto PdfFileWriter
        writer = PdfWriter()

        # Converter os documentos Docx para PDF usando Gotenberg
        for docx_path in docx_paths:
            with gotenberg_client.libre_office.to_pdf() as route:
                # Adicionar o documento Docx à rota de conversão
                route.convert(Path(docx_path))

                # Executar a conversão
                pdf_response = route.run()

                if pdf_response.status_code != 200:
                    return Response({"error": "Failed to convert to PDF"},
                                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                # Salvar o PDF convertido em um arquivo temporário
                temp_file = tempfile.NamedTemporaryFile(
                    suffix='.pdf', delete=False)
                temp_file.write(pdf_response.content)
                temp_file.close()

                # Ler o PDF convertido com PdfFileReader e adicionar ao writer
                reader = PdfReader(temp_file.name)
                for page in reader.pages:
                    writer.add_page(page)

        # Escrever o PDF mesclado em um objeto BytesIO
        merged_pdf_content = BytesIO()
        writer.write(merged_pdf_content)

        # Resetar o ponteiro do BytesIO para o início
        merged_pdf_content.seek(0)

        # Criar uma resposta HTTP com o PDF mesclado
        response = HttpResponse(
            merged_pdf_content, content_type='application/pdf')
        response['Content-Disposition'] = 'inline; filename=processo.pdf'

        return response


class WordView(APIView):
    def gerar_documentos_e_zipar(self, lista, json_data):
        # Crie um objeto BytesIO para manter o arquivo zip
        zip_buffer = BytesIO()

        # Crie um novo arquivo zip
        with zipfile.ZipFile(zip_buffer, 'w') as myzip:
            # Para cada membro na lista
            for membro in lista:
                # Gere o documento
                output = gerar_documento(membro, json_data)
                # Formate o nome do arquivo
                filename = f"{'-'.join(membro)}.docx"
                # Salve o documento em um objeto BytesIO temporário
                temp_output = BytesIO()
                temp_output.write(output.getbuffer())
                temp_output.seek(0)
                # Adicione o arquivo ao zip
                myzip.writestr(filename, temp_output.read())

        # Reposicione o ponteiro para o início do objeto BytesIO
        zip_buffer.seek(0)

        return zip_buffer

    def post(self, request):
        # Obter a lista e o JSON do corpo da solicitação
        listas = request.data.get('lista')
        json_data = request.data.get('json')

        # Chamar a função para gerar o documento e zipar
        zip_buffer = self.gerar_documentos_e_zipar(listas, json_data)

        # Configurar a resposta HTTP para o arquivo zip
        filename = 'processo.zip'
        wrapper = FileWrapper(zip_buffer)
        content_type = mimetypes.guess_type(filename)[0]
        response = FileResponse(wrapper, content_type=content_type)
        response['Content-Length'] = zip_buffer.getbuffer().nbytes
        response['Content-Disposition'] = f'attachment; filename={filename}'

        return response
