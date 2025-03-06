from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView
from processos.api.views import planoDeAtividadesViewSet, remanejamentoDasAtividadesViewSet, termoDeCompromissoViewSet, requerimentoViewSet, customUserViewSet

processo_router = DefaultRouter()
processo_router.register(r'customUser', customUserViewSet)
processo_router.register(r'planoDeAtividades', planoDeAtividadesViewSet)
processo_router.register(r'remanejamentoDasAtividades',
                         remanejamentoDasAtividadesViewSet)
processo_router.register(r'termoDeCompromisso', termoDeCompromissoViewSet)
processo_router.register(r'requerimento', requerimentoViewSet)

urlpatterns = [
    # ...
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(processo_router.urls)),
]
