from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Create your models here.


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('O endereço de e-mail é obrigatório')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    nome = models.CharField(max_length=200)
    matricula = models.IntegerField()
    cargo = models.CharField(max_length=50)
    num_celular = models.IntegerField()

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome', 'matricula', 'cargo', 'num_celular']

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class planoDeAtividades(models.Model):
    EDUCACAO_CHOICES = [
        ('m', 'Mestrado'),
        ('d', 'Doutorado'),
        ('pd', 'Pós-doutorado'),
        ('pro', 'Programas'),
        ('e', 'Estágios'),
    ]
    educacao = models.CharField(
        max_length=3, choices=EDUCACAO_CHOICES, blank=False, null=True)
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             null=True, default=None, on_delete=models.CASCADE)
    inicioPrev = models.DateField()
    fimPrev = models.DateField()
    nomeDaArea = models.CharField(max_length=80)
    numCode = models.IntegerField()
    linhaDePesq = models.TextField()
    keyWord1 = models.CharField(max_length=80, blank=True, null=True)
    keyWord2 = models.CharField(max_length=80, blank=True, null=True)
    keyWord3 = models.CharField(max_length=80, blank=True, null=True)
    keyWord4 = models.CharField(max_length=80, blank=True, null=True)
    keyWord5 = models.CharField(max_length=80, blank=True, null=True)
    keyWord6 = models.CharField(max_length=80, blank=True, null=True)
    keyWord7 = models.CharField(max_length=80, blank=True, null=True)
    resumo = models.TextField()
    introducao = models.TextField()
    objGeral = models.TextField()
    objEsp = models.TextField()
    metodologia = models.TextField()
    contribuicao = models.TextField()
    atv1 = models.CharField(max_length=80, blank=True, null=True)
    atv1Datainicio = models.DateField(blank=True, null=True)
    atv1Datafim = models.DateField(blank=True, null=True)
    atv2 = models.CharField(max_length=80, blank=True, null=True)
    atv2Datainicio = models.DateField(blank=True, null=True)
    atv2Datafim = models.DateField(blank=True, null=True)
    atv3 = models.CharField(max_length=80, blank=True, null=True)
    atv3Datainicio = models.DateField(blank=True, null=True)
    atv3Datafim = models.DateField(blank=True, null=True)
    atv4 = models.CharField(max_length=80, blank=True, null=True)
    atv4Datainicio = models.DateField(blank=True, null=True)
    atv4Datafim = models.DateField(blank=True, null=True)
    atv5 = models.CharField(max_length=80, blank=True, null=True)
    atv5Datainicio = models.DateField(blank=True, null=True)
    atv5Datafim = models.DateField(blank=True, null=True)
    atv6 = models.CharField(max_length=80, blank=True, null=True)
    atv6Datainicio = models.DateField(blank=True, null=True)
    atv6Datafim = models.DateField(blank=True, null=True)
    atv7 = models.CharField(max_length=80, blank=True, null=True)
    atv7Datainicio = models.DateField(blank=True, null=True)
    atv7Datafim = models.DateField(blank=True, null=True)
    apoioFin = models.TextField()
    refBiblio = models.TextField()
    dataAtual = models.DateField(auto_now=True)
    ano1Atividades = models.IntegerField(null=True)
    ano2Atividades = models.IntegerField(null=True)

    def __str__(self):
        return f"Post: {self.title}"


class remanejamentoDasAtividades(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             null=True, default=None, on_delete=models.CASCADE)
    requerente = models.CharField(max_length=255)
    matricula = models.IntegerField()
    cargo = models.CharField(max_length=255)  # Add max_length attribute
    setor = models.CharField(max_length=255)  # Add max_length attribute
    processo = models.IntegerField()
    nome_serv = models.TextField()
    checkbox_exterior = models.BooleanField(default=False)
    checkbox_pais = models.BooleanField(default=False)
    checkbox_outros = models.BooleanField(default=False)
    outros_motivo = models.TextField(blank=True, null=True)
    cidade = models.CharField(max_length=255)  # Add max_length attribute
    dataAtual = models.DateField(auto_now=True)

    def __str__(self):
        return f"Post: {self.title}"


class termoDeCompromisso(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             null=True, default=None, on_delete=models.CASCADE)
    nome = models.CharField(max_length=255)  # Add max_length attribute
    numMatricula = models.IntegerField()
    cargo = models.CharField(max_length=255)  # Add max_length attribute
    numProcesso = models.TextField(max_length=255)  # Add max_length attribute
    estudoExt = models.BooleanField(default=False)
    estudoPais = models.BooleanField(default=False)
    cidade = models.CharField(max_length=255)  # Add max_length attribute
    dataAtual = models.DateField(auto_now=True)
    testemunha1 = models.CharField(max_length=255)  # Add max_length attribute
    testemunha1Mat = models.IntegerField()
    testemunha2 = models.CharField(max_length=255)  # Add max_length attribute
    testemunha2Mat = models.IntegerField()
    exercicio = models.CharField(max_length=255)  # Add max_length attribute

    def __str__(self):
        return f"Post: {self.title}"


class requerimento(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             null=True, default=None, on_delete=models.CASCADE)
    requerente = models.CharField(max_length=255)  # Add max_length attribute
    matricula = models.IntegerField()
    cargo = models.CharField(max_length=255)  # Add max_length attribute
    celular = models.IntegerField()
    email = models.TextField()
    exercicio = models.CharField(max_length=255)  # Add max_length attribute
    regime = models.CharField(max_length=255)  # Add max_length attribute
    dataInicio = models.DateField()
    dataFim = models.DateField()
    dias = models.IntegerField()
    checkbox_programa = models.BooleanField(default=False)
    checkbox_treinamento = models.BooleanField(default=False)
    checkbox_congresso = models.BooleanField(default=False)
    cidade = models.CharField(max_length=255)  # Add max_length attribute
    dataAtual = models.DateField(auto_now=True)

    def __str__(self):
        return f"Post: {self.title}"
