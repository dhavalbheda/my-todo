from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import TaskSerializer, UserSerializer
from django.contrib.auth.models import User
from django.db.models import Q

from .models import Task

def clean_email(email):
    return  User.objects.filter(email=email).exists()
    
def clean_username(username):
    return  User.objects.filter(username=username).exists()

def getUser(id, username):
    try:
        user = User.objects.get(id=id)
        if user.username == username:
            return user
        else:
            return {}
    except User.DoesNotExist:
        return {}

@api_view(['POST'])
def loginUser(request):
    username = request.data['username']
    password = request.data['password']
    try:
        user = User.objects.get(Q(username=username) | Q(email=username))
        if user.password == password:
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"message": "Incorrect Password"}, status=status.HTTP_401_UNAUTHORIZED)
    except User.DoesNotExist:
        return Response({"message": "User Does Not Exists"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def getUserDetails(request):
    username = request.data['username']
    email = request.data['email']
    id = request.data['id']
    
    try:
        user = User.objects.get(id=id)
        if user.email == email and user.username == username:
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"message": "Please Login..."}, status=status.HTTP_401_UNAUTHORIZED)
    except User.DoesNotExist:
        return Response({"message": "Please Login..."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def createUser(request):
    if not clean_username(request.data['username']) and not clean_email(request.data['username']):
        if not clean_username(request.data['email']) and not clean_email(request.data['email']):
            user = UserSerializer(data=request.data)
            if user.is_valid():
                user.save()
                return Response(user.data, status=status.HTTP_201_CREATED)
            else:
                return Response({"message": "Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({"message": "Email Address Already Exists"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"message": "Username Already Exists"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def updateUser(request):
    id = request.data['id']
    old_email = request.data['old_email']
    old_username = request.data['old_username']
    password = request.data['password']
    new_email = request.data['email']
    new_username = request.data['username']

    try:
        old_User = User.objects.get(id=id)
        if old_User.email == old_email and old_User.username == old_username:
            
            if old_email != new_email and clean_email(new_email) or clean_username(new_email):
                return Response({"message": "Email Address Already Exists "}, status=status.HTTP_400_BAD_REQUEST)

            if old_username != new_username and clean_username(new_username) or clean_email(new_username):
                return Response({"message": "Username Already Exists "}, status=status.HTTP_400_BAD_REQUEST)

            data = {    'username': request.data['username'],
                        'email': request.data['email'],
                        'first_name': request.data['first_name'],
                        'last_name': request.data['last_name'],
                        'password': request.data['password'] }
            serializer = UserSerializer(instance=old_User, data=data)
            if serializer.is_valid():
                    serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"message": "Invalid Creadentials."}, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({"message": "Username Not Found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def apiOverview(request):
    api_urls ={
        'List': '/task-list',
        'Detail View': '/task-detail/<str:pk>/',
        'Create': '/task-create/',
        'Update': '/task-update/<str:pk>',
        'Delete': '/task-delete/<str:pk>'
    }
    return Response(api_urls, status=status.HTTP_200_OK)

@api_view(['GET'])
def getAllUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True) 
    return Response(serializer.data)

@api_view(['POST'])
def taskList(request):
    username = request.data['username']
    uid = request.data['id']
    user = getUser(uid,username)
    if user:
            tasks = Task.objects.all().filter(user=user)
            serializer = TaskSerializer(tasks, many=True) 
            return Response(serializer.data)
    else:
        return Response({"message": "User Not Authorized"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def taskCreate(request):
    username = request.data['username']
    uid = request.data['id']
    user = getUser(uid,username)
    if user:
        data = { "title": request.data['title'], "user": request.data['id'] }
        task = TaskSerializer(data=data)
        if task.is_valid():
            task.save()
            return Response(task.data, status=status.HTTP_201_CREATED)
        return Response({"message": "Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response({"message": "User Not Authorized"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def taskDetail(request, id):
    try:
        task = Task.objects.get(id=id)
        serializer = TaskSerializer(task, many=False)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    except Task.DoesNotExist:
        return Response({'message': 'Task Does Not Exists'}, status=status.HTTP_404_NOT_FOUND)
    except Exception:
        return Response({'message': 'Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
def taskUpdate(request, id):
    username = request.data['username']
    uid = request.data['id']
    user = getUser(uid,username)

    if user:
        try:
            task = Task.objects.get(id=id)
            if task.user.id == user.id:
                data = { "title": request.data['title'], "completed": request.data['completed']}
                serializer = TaskSerializer(instance=task, data=data)
                if serializer.is_valid():
                    serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({"message": "User Not Authorized"}, status=status.HTTP_404_NOT_FOUND)
        except Task.DoesNotExist:
            return Response({'message': 'Task Does Not Exists'}, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            return Response({'message': 'Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response({"message": "User Not Authorized"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def taskDelete(request, id):
    username = request.data['username']
    uid = request.data['id']
    user = getUser(uid,username)
    if user:
        try:
            task = Task.objects.get(id=id)
            if task.user.id == user.id:
                task.delete()
                return Response({"mesage": 'Task Deleted Successfully.'}, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({"mesage": "User Not Authorized"}, status=status.HTTP_404_NOT_FOUND)
        except Task.DoesNotExist:
            return Response({'message': 'Task Does Not Exists'}, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            return Response({'message': 'Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response({"message": "User Not Authorized"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def taskAllDelete(request):
    username = request.data['username']
    id = request.data['id']
    user = getUser(id,username)
    if user:
        try:
            task = Task.objects.filter(user=user)
            if task:
                task.delete()
                return Response({"mesage": 'Tasks Deleted Successfully.'}, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({"mesage": "Task Not Found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            return Response({'message': 'Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response({"message": "User Not Authorized"}, status=status.HTTP_404_NOT_FOUND)
