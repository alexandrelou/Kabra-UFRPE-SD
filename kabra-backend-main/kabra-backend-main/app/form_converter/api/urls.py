from rest_framework.routers import DefaultRouter
from django.urls import path, include
from processos.api.urls import processo_router
from converter.api.views import PdfView, WordView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = DefaultRouter()
router.registry.extend(processo_router.registry)

urlpatterns = [
    path('', include(router.urls)),
    path('pdf_converter/', PdfView.as_view(), name='pdf_converter'),
    path('word_converter/', WordView.as_view(), name='word_converter'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
