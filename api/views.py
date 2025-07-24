from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from django.contrib.auth.hashers import check_password

# Create your views here.

class LoginView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            return Response({'error': 'Email and password required.'}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects(email=email).first()
        if user and user.password == password:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

class RegisterView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        name = request.data.get('name')
        if not email or not password or not name:
            return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects(email=email).first():
            return Response({'error': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        user = User(email=email, password=password, name=name)
        user.save()
        return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
