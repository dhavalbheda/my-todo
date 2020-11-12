
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def checkServer(request):
    return HttpResponse('<h5>Server Running...</h5>')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',checkServer),
    path('checkserver/',checkServer),
    path('api/', include('api.urls'))
]
