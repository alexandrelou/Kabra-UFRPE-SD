from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from processos.models import planoDeAtividades, remanejamentoDasAtividades, termoDeCompromisso, requerimento, CustomUser


class customUserSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'nome', 'matricula',
                  'cargo', 'num_celular', 'password')

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user


class planoDeAtividadesSerializer(ModelSerializer):
    class Meta:
        model = planoDeAtividades
        fields = ('educacao', 'user', 'inicioPrev', 'fimPrev', 'nomeDaArea', 'numCode', 'linhaDePesq', 'keyWord1', 'keyWord2', 'keyWord3', 'keyWord4', 'keyWord5', 'keyWord6', 'resumo', 'introducao', 'objGeral', 'objEsp', 'metodologia', 'contribuicao', 'atv1', 'atv1Datainicio', 'atv1Datafim', 'atv2', 'atv2Datainicio', 'atv2Datafim', 'atv3', 'atv3Datainicio', 'atv3Datafim', 'atv4', 'atv4Datainicio', 'atv4Datafim', 'atv5', 'atv5Datainicio',
                  'atv5Datafim', 'atv6', 'atv6Datainicio', 'atv6Datafim', 'atv7', 'atv7Datainicio', 'atv7Datafim', 'apoioFin', 'refBiblio', 'dataAtual', 'ano1Atividades', 'ano2Atividades')


class remanejamentoDasAtividadesSerializer(ModelSerializer):
    class Meta:
        model = remanejamentoDasAtividades
        fields = ('user', 'requerente', 'matricula', 'cargo', 'setor', 'processo', 'nome_serv',
                  'checkbox_exterior', 'checkbox_pais', 'checkbox_outros', 'outros_motivo', 'cidade', 'dataAtual', )


class termoDeCompromissoSerializer(ModelSerializer):
    class Meta:
        model = termoDeCompromisso
        fields = ('user', 'nome', 'numMatricula', 'cargo', 'numProcesso', 'estudoExt', 'estudoPais',
                  'cidade', 'dataAtual', 'testemunha1', 'testemunha1Mat', 'testemunha2', 'testemunha2Mat', 'exercicio')


class requerimentoSerializer(ModelSerializer):
    class Meta:
        model = requerimento
        fields = ('user', 'requerente', 'matricula', 'cargo', 'celular', 'email', 'exercicio', 'regime', 'dataInicio',
                  'dataFim', 'dias', 'checkbox_programa', 'checkbox_treinamento', 'checkbox_congresso', 'cidade', 'dataAtual', )
