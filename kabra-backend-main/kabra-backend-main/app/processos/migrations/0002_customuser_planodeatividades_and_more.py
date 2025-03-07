# Generated by Django 5.0 on 2024-03-01 00:54

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('processos', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('nome', models.CharField(max_length=200)),
                ('matricula', models.IntegerField()),
                ('cargo', models.CharField(max_length=50)),
                ('num_celular', models.IntegerField()),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='planoDeAtividades',
            fields=[
                ('educacao', models.CharField(choices=[('m', 'Mestrado'), ('d', 'Doutorado'), ('pd', 'Pós-doutorado'), ('pro', 'Programas'), ('e', 'Estágios')], max_length=3, null=True)),
                ('id', models.AutoField(primary_key=True, serialize=False)),
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
                ('user', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='remanejamentoDasAtividades',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('requerente', models.CharField(max_length=255)),
                ('matricula', models.IntegerField()),
                ('cargo', models.CharField(max_length=255)),
                ('setor', models.CharField(max_length=255)),
                ('processo', models.IntegerField()),
                ('nome_serv', models.TextField()),
                ('checkbox_exterior', models.BooleanField(default=False)),
                ('checkbox_pais', models.BooleanField(default=False)),
                ('checkbox_outros', models.BooleanField(default=False)),
                ('outros_motivo', models.TextField(blank=True, null=True)),
                ('cidade', models.CharField(max_length=255)),
                ('dataAtual', models.DateField(auto_now=True)),
                ('user', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='activitiesPlan',
        ),
        migrations.DeleteModel(
            name='Processo',
        ),
        migrations.DeleteModel(
            name='relocActivities',
        ),
        migrations.RenameField(
            model_name='requerimento',
            old_name='check_congresso',
            new_name='checkbox_congresso',
        ),
        migrations.RenameField(
            model_name='requerimento',
            old_name='check_programa',
            new_name='checkbox_programa',
        ),
        migrations.RenameField(
            model_name='requerimento',
            old_name='check_treinamento',
            new_name='checkbox_treinamento',
        ),
        migrations.RenameField(
            model_name='requerimento',
            old_name='requerentMat',
            new_name='matricula',
        ),
        migrations.AddField(
            model_name='requerimento',
            name='user',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='termodecompromisso',
            name='user',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='requerimento',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='termodecompromisso',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
