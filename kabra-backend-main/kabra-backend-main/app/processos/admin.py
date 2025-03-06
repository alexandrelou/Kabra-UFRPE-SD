from django.contrib import admin
from .models import planoDeAtividades, remanejamentoDasAtividades, termoDeCompromisso, requerimento, CustomUser
# Register your models here.

admin.site.register(planoDeAtividades)
admin.site.register(remanejamentoDasAtividades)
admin.site.register(termoDeCompromisso)
admin.site.register(requerimento)
admin.site.register(CustomUser)
