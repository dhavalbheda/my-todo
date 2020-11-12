from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('all-users/', views.getAllUsers, name="all-users"),
    path('user-create/', views.createUser, name="user-create"),
    path('user-update/', views.updateUser, name="user-update"),
    path('user-login/', views.loginUser, name="user-login"),
    path('user-detail/', views.getUserDetails, name="user-detail"),

    path('task-list/', views.taskList, name="task-list"),
    path('task-detail/<str:id>/', views.taskDetail, name="task-detail"),
    path('task-create/', views.taskCreate, name="task-create"),
    path('task-update/<str:id>/', views.taskUpdate, name="task-update"),
    path('task-delete/<str:id>/', views.taskDelete, name="task-delete"),
    path('task-all-delete/', views.taskAllDelete, name="task-all-delete"),
]