import os
from io import BytesIO
from django.conf import settings
from docxtpl import DocxTemplate

TEMPLATES = {
    'ufrpe': {
        'afastamento_curta': {
            'requerimento': os.path.join(settings.BASE_DIR, 'templates', 'afastamento_curta', 'requerimento.docx'),
            'remanejamento': os.path.join(settings.BASE_DIR, 'templates', 'afastamento_curta', 'remanejamento.docx'),
            'termo': os.path.join(settings.BASE_DIR, 'templates', 'afastamento_curta', 'termo.docx'),
            'plano': os.path.join(settings.BASE_DIR, 'templates', 'afastamento_curta', 'plano.docx')
        },
        # outros processos...
    },
    # outras faculdades...
}


def gerar_documento(lista, json_data):
    # O caminho do template é determinado pela lista
    faculdade, processo, nome_arquivo = lista
    template_path = TEMPLATES[faculdade][processo][nome_arquivo]

    # Seu código para gerar o documento
    doc = DocxTemplate(template_path)

    # Renderize o documento com o contexto
    doc.render(json_data)

    # Salve o documento em um objeto BytesIO
    output = BytesIO()
    doc.save(output)

    # Reposicione o ponteiro para o início do objeto BytesIO
    output.seek(0)

    return output
