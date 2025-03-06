# Generated by Django 5.0 on 2024-01-03 02:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='activitiesPlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('educacao', models.CharField(choices=[('m', 'Mestrado'), ('d', 'Doutorado'), ('pd', 'Pós-doutorado'), ('pro', 'Programas'), ('e', 'Estágios')], max_length=3, null=True)),
                ('inicioPrev', models.DateField()),
                ('fimPrev', models.DateField()),
                ('nomeDaArea', models.CharField(max_length=80)),
                ('numCode', models.IntegerField()),
                ('linhaDePesq', models.TextField()),
                ('keyWord1', models.CharField(blank=True, max_length=80, null=True)),
                ('keyWord2', models.CharField(blank=True, max_length=80, null=True)),
                ('keyWord3', models.CharField(blank=True, max_length=80, null=True)),
                ('keyWord4', models.CharField(blank=True, max_length=80, null=True)),
                ('keyWord5', models.CharField(blank=True, max_length=80, null=True)),
                ('keyWord6', models.CharField(blank=True, max_length=80, null=True)),
                ('keyWord7', models.CharField(blank=True, max_length=80, null=True)),
                ('resumo', models.TextField()),
                ('introducao', models.TextField()),
                ('objGeral', models.TextField()),
                ('objEsp', models.TextField()),
                ('metodologia', models.TextField()),
                ('contribuicao', models.TextField()),
                ('atv1', models.CharField(blank=True, max_length=80, null=True)),
                ('atv1Datainicio', models.DateField(blank=True, null=True)),
                ('atv1Datafim', models.DateField(blank=True, null=True)),
                ('atv2', models.CharField(blank=True, max_length=80, null=True)),
                ('atv2Datainicio', models.DateField(blank=True, null=True)),
                ('atv2Datafim', models.DateField(blank=True, null=True)),
                ('atv3', models.CharField(blank=True, max_length=80, null=True)),
                ('atv3Datainicio', models.DateField(blank=True, null=True)),
                ('atv3Datafim', models.DateField(blank=True, null=True)),
                ('atv4', models.CharField(blank=True, max_length=80, null=True)),
                ('atv4Datainicio', models.DateField(blank=True, null=True)),
                ('atv4Datafim', models.DateField(blank=True, null=True)),
                ('atv5', models.CharField(blank=True, max_length=80, null=True)),
                ('atv5Datainicio', models.DateField(blank=True, null=True)),
                ('atv5Datafim', models.DateField(blank=True, null=True)),
                ('atv6', models.CharField(blank=True, max_length=80, null=True)),
                ('atv6Datainicio', models.DateField(blank=True, null=True)),
                ('atv6Datafim', models.DateField(blank=True, null=True)),
                ('atv7', models.CharField(blank=True, max_length=80, null=True)),
                ('atv7Datainicio', models.DateField(blank=True, null=True)),
                ('atv7Datafim', models.DateField(blank=True, null=True)),
                ('apoioFin', models.TextField()),
                ('refBiblio', models.TextField()),
                ('dataAtual', models.DateField(auto_now=True)),
                ('ano1Atividades', models.IntegerField(null=True)),
                ('ano2Atividades', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Processo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('body', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='relocActivities',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nomeServ', models.CharField(max_length=255)),
                ('numMatricula', models.IntegerField()),
                ('cargo', models.CharField(max_length=255)),
                ('setor', models.CharField(max_length=255)),
                ('numProcesso', models.IntegerField()),
                ('remanejadasPara', models.TextField()),
                ('lei', models.BooleanField(default=False)),
                ('pais', models.BooleanField(default=False)),
                ('outros', models.BooleanField(default=False)),
                ('outrosMotivo', models.TextField(blank=True, null=True)),
                ('cidade', models.CharField(max_length=255)),
                ('dataAtual', models.DateField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='requerimento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('requerente', models.CharField(max_length=255)),
                ('requerentMat', models.IntegerField()),
                ('cargo', models.CharField(max_length=255)),
                ('celular', models.IntegerField()),
                ('email', models.TextField()),
                ('exercicio', models.CharField(max_length=255)),
                ('regime', models.CharField(max_length=255)),
                ('dataInicio', models.DateField()),
                ('dataFim', models.DateField()),
                ('dias', models.IntegerField()),
                ('check_programa', models.BooleanField(default=False)),
                ('check_treinamento', models.BooleanField(default=False)),
                ('check_congresso', models.BooleanField(default=False)),
                ('cidade', models.CharField(max_length=255)),
                ('dataAtual', models.DateField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='termoDeCompromisso',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=255)),
                ('numMatricula', models.IntegerField()),
                ('cargo', models.CharField(max_length=255)),
                ('numProcesso', models.TextField(max_length=255)),
                ('estudoExt', models.BooleanField(default=False)),
                ('estudoPais', models.BooleanField(default=False)),
                ('cidade', models.CharField(max_length=255)),
                ('dataAtual', models.DateField(auto_now=True)),
                ('testemunha1', models.CharField(max_length=255)),
                ('testemunha1Mat', models.IntegerField()),
                ('testemunha2', models.CharField(max_length=255)),
                ('testemunha2Mat', models.IntegerField()),
                ('exercicio', models.CharField(max_length=255)),
            ],
        ),
    ]
