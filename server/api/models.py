from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User

class Task(models.Model):
    title = models.CharField(max_length=5000)
    completed = models.BooleanField(default=False, blank=True, null=True)
    user = models.ForeignKey(User  , on_delete= models.CASCADE, default=1)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
