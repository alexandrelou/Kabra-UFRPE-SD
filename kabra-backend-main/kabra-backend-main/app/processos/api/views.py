from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from processos.models import planoDeAtividades, remanejamentoDasAtividades, termoDeCompromisso, requerimento, CustomUser
from processos.api.serializers import planoDeAtividadesSerializer, remanejamentoDasAtividadesSerializer, termoDeCompromissoSerializer, requerimentoSerializer, customUserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import ModelViewSet


class customUserViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = customUserSerializer

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'id': serializer.data['id']}, status=status.HTTP_201_CREATED, headers=headers)


class planoDeAtividadesViewSet(ModelViewSet):
    queryset = planoDeAtividades.objects.all()
    serializer_class = planoDeAtividadesSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'id': serializer.data['id']}, status=status.HTTP_201_CREATED, headers=headers)


class remanejamentoDasAtividadesViewSet(ModelViewSet):
    queryset = remanejamentoDasAtividades.objects.all()
    serializer_class = remanejamentoDasAtividadesSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'id': serializer.data['id']}, status=status.HTTP_201_CREATED, headers=headers)


class termoDeCompromissoViewSet(ModelViewSet):
    queryset = termoDeCompromisso.objects.all()
    serializer_class = termoDeCompromissoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'id': serializer.data['id']}, status=status.HTTP_201_CREATED, headers=headers)


class requerimentoViewSet(ModelViewSet):
    queryset = requerimento.objects.all()
    serializer_class = requerimentoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'id': serializer.data['id']}, status=status.HTTP_201_CREATED, headers=headers)
