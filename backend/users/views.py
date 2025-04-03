from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
import json
import bcrypt
from django.http import JsonResponse
import jwt, datetime
from .serializers import UserSerializer
# Create your views here.

class RegisterView(APIView):
    def post(self, request):    
        data = json.loads(request.body)
        if User.objects.filter(email=data['email']).exists():
            return JsonResponse({'error': 'User already exists'}, status=400)
        
        raw_password = data['password'].replace(' ', '')
        hashed_password = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt())

        user = User.objects.create(
            name=data['name'],
            email=data['email'],
            password=hashed_password.decode('utf-8')
        )
        return JsonResponse({'message': 'User registered successfully'}, status=201)

class LoginView(APIView):
    def post(self,request):
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        user = User.objects.filter(email=email).first()
        if user:
            stored_password = user.password.encode('utf-8')

            if bcrypt.checkpw(password.encode('utf-8'), stored_password):

                payload = {
                    'id': user.id,
                    'exp': datetime.datetime.now() + datetime.timedelta(minutes=60),
                    'iat': datetime.datetime.now()
                }

                token = jwt.encode(payload, 'secret', algorithm='HS256')

                response = JsonResponse({'message': 'Login successful'}, status=200)
                response.set_cookie(key='jwt', value=token, httponly=True)
                response.data = {
                    'jwt': token
                }

                return response
            return JsonResponse({'error': 'Invalid credentials'}, status=501)
        return JsonResponse({'error': 'User does not exist'}, status=400)
    
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token: 
            return JsonResponse({'authenticated': False}, status=200)

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return JsonResponse({'authenticated': False}, status=200)
        
        user = User.objects.filter(id=payload['id']).first()
        
        return JsonResponse({"authenticated":True}, status=200)

class UserInfoView(APIView):
     def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            return JsonResponse({'error': 'Invalid token'}, status=403)

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return JsonResponse({'error': 'Token expired'}, status=403)
        
        user = User.objects.filter(id=payload['id']).first()
        user_serialized = UserSerializer(user)
        return JsonResponse({'user': user_serialized.data}, status=200)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {"message": "User logged out"}
    
        return response 