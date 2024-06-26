from django.shortcuts import render
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.views import APIView

# Create your views here.
class RegisterAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()

        token = RefreshToken.for_user(user)

        data = serializer.data
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


class UserInfoAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        user = self.request.user
        print(user)
        return user
    

class NotesAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = NotesSerializer

    def get_queryset(self):
        user = self.request.user
        return Notes.objects.filter(author=user)

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        user = self.request.user
        
        noteData = request.data
        noteData['author'] = user.id

        serializer = NotesSerializer(data=noteData)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    

class SingleNoteAPIView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = NotesSerializer

    def get(self, request, username, id):
        user = self.request.user

        if user.username != username:
            return Response({"error":"Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            note = Notes.objects.get(pk=id, author=user)
        except Notes.DoesNotExist:
            return Response({"error": "Note not found"}, status=status.HTTP_404_NOT_FOUND)
    
        serializer = NotesSerializer(note)
        print(serializer.data)
        return Response(serializer.data)
    
    def put(self, request, username, id):
        user = self.request.user

        if user.username != username:
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            note = Notes.objects.get(pk=id, author=user)
        except Notes.DoesNotExist:
            return Response({"error": "Note not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(note, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, username, id):
        user = self.request.user

        if user.username != username:
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            note = Notes.objects.get(pk=id, author=user)
        except Notes.DoesNotExist:
            return Response({"error": "Note not found"}, status=status.HTTP_404_NOT_FOUND)

        note.delete()
        notes = Notes.objects.filter(author=user)
        serializer = NotesSerializer(notes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class CalculatorAPIView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        equation = request.data
        print(equation['calc'])

        if not equation:
            return Response({'error': 'No equation provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            result = eval(equation['calc'])
            print(result)
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class BudgetAPIView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request,*args, **kwargs):
        budget_data = request.data

        income = int(budget_data['income'])
        commitments = int(budget_data['commitments'])
        house = int(budget_data['house'])
        othercommitments = int(budget_data['othercommitments'])
        other = int(budget_data['other'])

        balance = income - (commitments + house + othercommitments + other)
        budget_data['balance'] = balance

        sum_of_costs = commitments + house + othercommitments + other
        budget_data['sum_of_costs'] = sum_of_costs

        com_perc = commitments / income * 100
        budget_data['com_perc'] = com_perc

        house_perc = house / income  * 100
        budget_data['house_perc'] = house_perc

        other_com_perc = othercommitments / income  * 100
        budget_data['other_com_perc'] = other_com_perc

        other_perc = other / income  * 100
        budget_data['other_perc'] = other_perc

        print(budget_data)
        return Response(budget_data, status=status.HTTP_200_OK)