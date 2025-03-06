from django import forms
from processos.models import planoDeAtividades, remanejamentoDasAtividades, termoDeCompromisso, requerimento, CustomUser


class CustomUserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = ["nome", "matricula", "cargo",
                  "num_celular", "email", "password"]

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user


class actPlanForm(forms.ModelForm):

    # create meta class
    class Meta:
        # specify model to be used
        model = planoDeAtividades

        # specify fields to be used
        fields = [
            "educacao",
            "user",
            "inicioPrev",
            "fimPrev",
            "nomeDaArea",
            "numCode",
            "linhaDePesq",
            "keyWord1",
            "keyWord2",
            "keyWord3",
            "keyWord4",
            "keyWord5",
            "keyWord6",
            "resumo",
            "introducao",
            "objGeral",
            "objEsp",
            "metodologia",
            "contribuicao",
            "atv1",
            "atv1Datainicio",
            "atv1Datafim",
            "atv2",
            "atv2Datainicio",
            "atv2Datafim",
            "atv3",
            "atv3Datainicio",
            "atv3Datafim",
            "atv4",
            "atv4Datainicio",
            "atv4Datafim",
            "atv5",
            "atv5Datainicio",
            "atv5Datafim",
            "atv6",
            "atv6Datainicio",
            "atv6Datafim",
            "atv7",
            "atv7Datainicio",
            "atv7Datafim",
            "apoioFin",
            "refBiblio",
            "dataAtual",
            "ano1Atividades",
            "ano2Atividades",
        ]


class remanejamentoDasAtividadesForm(forms.ModelForm):

    # create meta class
    class Meta:
        # specify model to be used
        model = remanejamentoDasAtividades

        # specify fields to be used
        fields = [
            "user",
            "requerente",
            "matricula",
            "cargo",
            "setor",
            "processo",
            "nome_serv",
            "checkbox_exterior",
            "checkbox_pais",
            "checkbox_outros",
            "outros_motivo",
            "cidade",
            "dataAtual",
        ]


class termoDeCompromissoForm(forms.ModelForm):

    # create meta class
    class Meta:
        # specify model to be used
        model = termoDeCompromisso

        # specify fields to be used
        fields = [
            "user",
            "nome",
            "numMatricula",
            "cargo",
            "numProcesso",
            "estudoExt",
            "estudoPais",
            "cidade",
            "dataAtual",
            "testemunha1",
            "testemunha1Mat",
            "testemunha2",
            "testemunha2Mat",
            "exercicio",
        ]


class requerimentoForm(forms.ModelForm):

    # create meta class
    class Meta:
        # specify model to be used
        model = requerimento

        # specify fields to be used
        fields = [
            "user",
            "requerente",
            "matricula",
            "cargo",
            "celular",
            "email",
            "exercicio",
            "regime",
            "dataInicio",
            "dataFim",
            "dias",
            "checkbox_programa",
            "checkbox_treinamento",
            "checkbox_congresso",
            "cidade", "dataAtual",
        ]
