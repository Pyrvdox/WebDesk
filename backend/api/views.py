from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class RegisterAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()

        token = RefreshToken.for_user(user)

        data = serializers.data
        data["tokens"] = {
            "refresh":str(token),
            "access":str(token.access_token)}

        return Response(data, status.HTTP_201_CREATED)
    
class LoginAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.validated_data

        serializer = UserSerializer(user)

        token = RefreshToken.for_user(user)

        data = serializer.data
        data["tokens"] = {
            "refresh":str(token),
            "access":str(token.access_token)}

        return Response(data, status.HTTP_200_OK)
    

class LogoutAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status.HTTP_205_RESET_CONTENT)
        except:
            return Response(status.HTTP_400_BAD_REQUEST)

